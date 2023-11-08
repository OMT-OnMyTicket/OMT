import React, { useEffect, useState } from 'react';
import styled from '../../styles/mainP_S/chart.module.css';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

const Chart = () => {
  const [movieChart, setMovieChart] = useState<DailyBoxOfficeItem[]>([]);
  const [moviePosters, setMoviePosters] = useState<string[]>([]);

  // 무비차트 데이터 받아오기

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

        // 영화 포스터 URL 받아오기
        const detailMovieInfoPromises = extractedData.map((movie: any) => {
          return axios
            .get(`${KMDB_URL}`, {
              params: {
                collection: 'kmdb_new2',
                detail: 'Y',
                title: movie.movieNm,
                ServiceKey: `${KMDB_KEY}`,
                releaseDts: 2023
              }
            })
            .then((res) => {
              const results = res.data.Data[0]?.Result || [];
              const posters = results.map(
                (result: any) => result.posters.split('|')[0]
              );
              return posters[0] || '/png/preparing.png';
            })
            .catch((error) => {
              console.error('에러 내용', error);
              return '/png/preparing.png';
            });
        });

        Promise.all(detailMovieInfoPromises)
          .then((posters) => {
            setMoviePosters(posters);
            setMovieChart(extractedData); //  영화 정보 및 포스터 정보가 모두 준비된 후에 상태를 업데이트
          })
          .catch((error) => {
            console.error('에러 내용', error);
            setMoviePosters([]);
            setMovieChart([]); // 포스터 정보를 가져오지 못할 경우 빈 배열로
          });
      })
      .catch((error) => {
        console.error('에러 내용', error);
        setMovieChart([]);
        setMoviePosters([]);
      });
  }, []); // 빈 의존성 배열을 사용하여 한 번만 실행되도록 하기

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 8000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 4
        }
      }
    ]
  };

  return (
    <div className={styled.contents}>
      <div className={styled.chartTitle}>
        <h3>무비차트</h3>
      </div>
      <div className={styled.movieSlider}>
        <Slider {...settings}>
          {movieChart.map((a: DailyBoxOfficeItem, i: number) => {
            return (
              <div className={styled.movies} key={a.rank}>
                <img
                  src={moviePosters[i] || '/png/preparing.png'}
                  alt='movie poster'
                  className={styled.moviePoster}
                />
                <strong className={styled.movieTitle}>{a.movieNm}</strong>
                <div className={styled.moviesTxt2}>누적관객수: {a.audiAcc}</div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Chart;
