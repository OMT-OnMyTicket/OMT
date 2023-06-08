import React, { useEffect, useState } from 'react';
import styled from '../../styles/mainP_S/chart.module.css';
import axios from 'axios';

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

  return (
    <div className={styled.contents}>
      <div className={styled.chartTitle}>
        <h3>무비차트</h3>
        <h3>상영예정작</h3>
      </div>

      <div className={styled.chartList}>
        {movieChart.map((a: DailyBoxOfficeItem, i: number) => {
          return (
            <div className={styled.movies} key={a.rank}>
              <div>
                <img
                  src='/범죄도시.png'
                  alt='영화 포스터'
                  className={styled.movies}
                />
              </div>
              <div className={styled.moviesTxt}>
                <strong className={styled.movieTitle}>{a.movieNm}</strong>
                <div className={styled.moviesTxt2}>
                  <span>{a.audiAcc}</span>
                </div>
              </div>
            </div>
          );
        })}
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
