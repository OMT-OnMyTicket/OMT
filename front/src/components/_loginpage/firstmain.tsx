import styled from '@/styles/loginP_S/main.module.css';

const firstmain = () => {
  return (
    <>
      <div className={styled.Container}>
        <div className={styled.Title}>ON MY TICKET</div>
        <div className={styled.subTitle}>
          <p>
            On My Ticket에서는 <br />
            나만의 영화를 모아 정리할 수 있습니다.
            <br /> 내가 관람한 영화를 한눈에 확인해보세요
          </p>
        </div>
        <div className={styled.imgLayout}>
          <img className={styled.ticketImg1} src='/ticket1.png' />
          <img className={styled.ticketImg2} src='/ticket2.png' />
        </div>
      </div>
    </>
  );
};

export default firstmain;
