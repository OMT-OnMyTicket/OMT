import styled from '../../styles/mainP_S/mySection.module.css';

const mySection = () => {
  // 최근 예매 티켓 어떻게 가져올건지
  // My Ticket 페이지에서 유저가 마지막으로 입력한 정보를 가지고 가져오는 걸로

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
          <div className={styled.MyTxt}>
            <div>선호장르 : 액션</div>
            <div>나의 등급 : 영화광</div>
            <div>월 평균 관람 횟수: 3회</div>
          </div>
          <div>
            <img src='/김세훈.png' className={styled.UserPhoto} />
            <div className={styled.UserName}>김세훈 님</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default mySection;
