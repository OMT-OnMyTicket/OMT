import styled from '../../styles/mainP_S/chart.module.css';
import axios from 'axios';

const KEY = process.env.NEXT_PUBLIC_KOPIC_KEY;
const URL = process.env.NEXT_PUBLIC_KOPIC_URL;

const chart = () => {
  let movieChart = ['1위', '2위', '3위', '4위', '5위'];

  axios
    .get(`${URL}`, {
      params: {
        key: `${KEY}`,
        targetDt: '20230606'
      }
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => console.log(error));

  return (
    <div className={styled.contents}>
      <div className={styled.chartTitle}>
        <h3>무비차트</h3>
        <h3>상영예정작</h3>
      </div>

      <div className={styled.chartList}>
        {movieChart.map((a, i) => {
          return (
            <div className={styled.movies} key={i}>
              <div>
                <img
                  src='/범죄도시.png'
                  alt='영화 포스터'
                  className={styled.movies}
                />
              </div>
              <div className={styled.moviesTxt}>
                <strong className={styled.movieTitle}>{a}영화제목</strong>
                <div className={styled.moviesTxt2}>
                  <span>95%</span>
                  <span>예매율 00%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default chart;
