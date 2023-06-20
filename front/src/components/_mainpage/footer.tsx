import styled from '../../styles/mainP_S/footer.module.css';

const footer = () => {
  return (
    <div className={styled.Layout}>
      <div className={styled.footer_Logo}>ON MY TICKET</div>
      <div className={styled.footerTxt}>
        <div className={styled.footerL}>
          <div>프로젝트 명: ON MY TICKET</div>
          <div>프로젝트 시작: 2023.06.01</div>
          <div>참고 website: </div>
        </div>
        <div className={styled.footerR}>
          <div>제작자: 김세훈</div>
          <div>GitHub: </div>
          <div>Mail: </div>
        </div>
      </div>
    </div>
  );
};

export default footer;
