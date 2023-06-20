import styled from '../../styles/mainP_S/mySection.module.css';

const mySection = () => {
  return (
    <div className={styled.Layout}>
      <div className={styled.Title}>
        <h3>최근 예매 티켓</h3>
        <h3>MY Page</h3>
      </div>
      <div className={styled.Boxes}>
        <div className={styled.LeftBox}>
          <div className={styled.recentTxt}>
            <div>범죄도시3</div>
            <div>성인 1</div>
            <div>CGV 강남</div>
            <div>2023.06.10</div>
          </div>

          <img src='/범죄도시.png' className={styled.poster} />
        </div>

        <div className={styled.RightBox}>
          <div>사용자</div>
        </div>
      </div>
    </div>
  );
};

export default mySection;
