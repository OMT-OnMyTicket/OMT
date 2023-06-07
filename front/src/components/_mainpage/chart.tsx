import styled from '../../styles/mainP_S/chart.module.css';

const chart = () => {
  return (
    <div className={styled.contents}>
      <div className={styled.chartTitle}>
        <h4>무비차트</h4>
        <h4>상영예정작</h4>
      </div>
      <div className={styled.chartList}>
        <div className={styled.movies}>
          <div>
            <p className={styled.img}>영화이미지</p>
            <div>영화 노출 등급</div>
          </div>

          <div>
            <strong>영화제목</strong>
            <span>
              <p className={styled.img}>95%</p>
            </span>
            <span>예매율 00%</span>
          </div>
        </div>
        <div>2등</div>
        <div>3등</div>
        <div>4등</div>
        <div>5등</div>
        <div>6등</div>
        <div>7등</div>
        <div>8등</div>
        <div>9등</div>
        <div>10등</div>
      </div>
    </div>
  );
};

export default chart;
