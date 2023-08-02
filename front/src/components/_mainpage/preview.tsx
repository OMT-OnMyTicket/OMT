import styled from '../../styles/mainP_S/preview.module.css';

const preview = () => {
  return (
    <div className={styled.allContents}>
      <div className={styled.preview}>
        <iframe
          className={styled.video}
          src='https://www.youtube.com/embed/hAO9a1xSo3M?autoplay=1&mute=1&loop=1&playlist=hAO9a1xSo3M'
          title='콘크리트 유토피아 예고편'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
        <strong className={styled.title}>콘크리트 유토피아 </strong>
        <span className={styled.txt}>
          극장가를 압도할 강력한 기대작 <br /> 8월 9일 대개봉!
        </span>
        <button className={styled.Ticketing}>
          <p className={styled.TicketingTxt}>예매하기</p>
        </button>
      </div>
    </div>
  );
};

export default preview;
