import React, { useEffect, useState } from 'react';
import styled from '../../styles/mainP_S/chart.module.css';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const KEY = process.env.NEXT_PUBLIC_KOPIC_KEY;
const URL = process.env.NEXT_PUBLIC_KOPIC_URL;

interface DailyBoxOfficeItem {
  rank: string;
  movieNm: string;
  audiAcc: string;
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
                  src='/범죄도시.png'
                  alt='movie poster'
                  className={styled.moviePoster}
                />
                <strong className={styled.movieTitle}>{a.movieNm}</strong>
                <div className={styled.moviesTxt2}>
                  누적 관람객 : {a.audiAcc}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

// SSR로 구성할 때 공부해볼 것

// export async function getServerSideProps() {
//   const targetDt = get_date_str(new Date());

//   try {
//     const res = await axios.get(`${URL}`, {
//       params: {
//         key: KEY,
//         targetDt: targetDt
//       }
//     });

//     const result = res.data.boxOfficeResult;
//     const extractedData = result.dailyBoxOfficeList.map(
//       (item: DailyBoxOfficeItem) => ({
//         rank: item.rank,
//         movieNm: item.movieNm,
//         audiAcc: item.audiAcc
//       })
//     );

//     return {
//       props: {
//         movieChart: extractedData
//       }
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         movieChart: []
//       }
//     };
//   }
// }

export default Chart;
