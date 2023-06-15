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

const Chart = () => {
  const [movieChart, setMovieChart] = useState<DailyBoxOfficeItem[]>([]);
  const [moviePosters, setMoviePosters] = useState<string[]>([]);

  // 무비차트 데이터 받아오기

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
              ServiceKey: `${KMDB_KEY}`
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

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 8000
  };

  return (
    <div className={styled.contents}>
      <div className={styled.chartTitle}>
        <h3>무비차트</h3>
        <h3>상영예정작</h3>
      </div>
      <div className={styled.movieSlider}>
        <Slider {...settings}>
          {movieChart.map((a: DailyBoxOfficeItem, i: number) => {
            return (
              <div className={styled.movies} key={a.rank}>
                <img
                  src={moviePosters[i] || '/preparing.png'}
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
