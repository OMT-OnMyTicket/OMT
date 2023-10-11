'use client';

import styled from '../../styles/ticketingP_S/choice.module.css';
import PageCheck from '../../components/pageCheck';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const KEY = process.env.NEXT_PUBLIC_KOPIC_KEY;
const URL = process.env.NEXT_PUBLIC_KOPIC_URL;
const KMDB_KEY = process.env.NEXT_PUBLIC_KMDB_KEY;
const KMDB_URL = process.env.NEXT_PUBLIC_KMDB_URL;

interface DailyBoxOfficeItem {
  rank: string;
  movieNm: string;
  audiAcc: string;
}
interface MoviePosters {
  url: string;
}

// 전날 날짜 yyyymmdd 형식으로 추출하기 => targetDt 추출
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let dateString = year + month + day;
let date = Number(dateString) - 1;

const ChoiceMovie = () => {
  const activePage = 2;
  const [movieChart, setMovieChart] = useState<DailyBoxOfficeItem[]>([]);
  const [moviePosters, setMoviePosters] = useState<string[]>([]);
  const [movieContents, setMovieContents] = useState<string[]>([]);

  const handleChoiceMovie = (id: string, url: string) => {
    localStorage.setItem('영화', id);
    localStorage.setItem('포스터URL', url);
  };

  useEffect(() => {
    axios
      .get(`${URL}`, {
        params: {
          key: `${KEY}`,
          targetDt: `${date}`
        }
      })
      .then((res) => {
        let result = res.data.boxOfficeResult;
        let extractedData = result.dailyBoxOfficeList.map(
          (item: DailyBoxOfficeItem) => ({
            rank: item.rank,
            movieNm: item.movieNm,
            audiAcc: item.audiAcc
          })
        );
        setMovieChart(extractedData);

        // 영화 postURL 받아오기

        const detailMovieInfo = extractedData.map((movie: any) => {
          return axios.get(`${KMDB_URL}`, {
            params: {
              collection: 'kmdb_new2',
              detail: 'Y',
              title: movie.movieNm,
              ServiceKey: `${KMDB_KEY}`,
              releaseDts: 2023
            }
          });
        });

        Promise.all(detailMovieInfo)
          // 영화 포스터 가져오기
          .then((responses) => {
            const posters = responses.map((res) => {
              const posters = res.data.Data[0].Result[0].posters;
              return posters.split('|')[0];
            });
            setMoviePosters(posters);

            // 영화 줄거리 가져오기
            const contents = responses.map((res) => {
              const contents =
                res.data.Data[0].Result[0].plots.plot[0].plotText;
              return contents.split('.', 2);
            });
            setMovieContents(contents);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className={styled.Container}>
        <div className={styled.Choice_Txts}>
          <div className={styled.Choice_Title}>직접예매</div>
          <div className={styled.PageCheck_Layout}>
            <div className={styled.Choice_Txt}>영화 선택하기</div>
            <PageCheck activePage={activePage} />
          </div>
        </div>
        <div className={styled.Movie_Container}>
          {movieChart.map((a: DailyBoxOfficeItem, i: number) => {
            return (
              <div className={styled.movies} key={a.rank}>
                <div className={styled.moviePoster_Layout}>
                  <img
                    src={moviePosters[i] || '/png/preparing.png'}
                    alt='movie poster'
                    className={styled.moviePoster}
                  />
                  <div className={styled.movieContents_Layout}>
                    <p className={styled.Contentes_Title}>{a.movieNm}</p>
                    <p className={styled.movieContents}>{movieContents[i]}</p>
                    <Link href='/ticketing/select'>
                      <div
                        className={styled.Btn}
                        onClick={() =>
                          handleChoiceMovie(
                            `${a.movieNm}`,
                            `${moviePosters[i]}`
                          )
                        }
                      >
                        예매하기
                      </div>
                    </Link>
                  </div>
                </div>
                <strong className={styled.movieTitle}>
                  {a.rank}. {a.movieNm}
                </strong>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ChoiceMovie;
