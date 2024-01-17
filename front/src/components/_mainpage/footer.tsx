import styled from '../../styles/mainP_S/footer.module.css';
import Link from 'next/link';

const footer = () => {
  return (
    <div className={styled.Layout}>
      <div className={styled.footer_Logo}>ON MY TICKET</div>
      <div className={styled.footerTxt}>
        <div className={styled.footerL}>
          <div>프로젝트 명: ON MY TICKET</div>
          <div>참고 사이트: CGV, MEGABOX</div>
        </div>
        <div className={styled.footerR}>
          <div> FRONT - 김세훈 , BACK - 김지열</div>
          <Link href={'https://github.com/OMT-OnMyTicket/OMT'}>
            <div>GitHub - 클릭시 이동합니다. </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default footer;
