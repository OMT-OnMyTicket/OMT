import styled from '../../styles/mainP_S/preview.module.css';

const preview = () => {
  return (
    <div className={styled.allContents}>
      <div className={styled.preview}>
        <iframe
          className={styled.video}
          src='https://www.youtube.com/embed/Obc6ecquoA0?autoplay=1&mute=1&loop=1&playlist=Obc6ecquoA0'
          title='귀공자 예고편'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
        <strong className={styled.title}>귀공자 </strong>
        <span className={styled.txt}>
          [신세계 , 마녀] 박훈정 감독 작품 <br /> 김선호 강렬한 스크린 첫 데뷔!
        </span>
        <button className={styled.Ticketing}>
          <p className={styled.TicketingTxt}>예매하기</p>
        </button>
      </div>
    </div>
  );
};

export default preview;
