'use client';

import styled from '../../styles/ticketingP_S/choice.module.css';
import PageCheck from '../../components/pageCheck';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
function get_date_str(date: any) {
  var sYear = date.getFullYear();
  var sMonth = date.getMonth() + 1;
  var sDate = date.getDate();

  sMonth = sMonth > 9 ? sMonth : '0' + sMonth;
  sDate = sDate > 9 ? sDate : '0' + sDate;
  return sYear + sMonth + sDate - 1;
}
function get_today() {
  return get_date_str(new Date());
}

const ChoiceMovie = () => {
  const activePage = 2;
  const [movieChart, setMovieChart] = useState<DailyBoxOfficeItem[]>([]);
  const [moviePosters, setMoviePosters] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`${URL}`, {
        params: {
          key: `${KEY}`,
          targetDt: `${get_today()}`
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
          .then((responses) => {
            const posters = responses.map((res) => {
              const posters = res.data.Data[0].Result[0].posters;
              return posters.split('|')[0];
            });
            setMoviePosters(posters);
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
                <img
                  src={moviePosters[i] || '/preparing.png'}
                  alt='movie poster'
                  className={styled.moviePoster}
                />
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
