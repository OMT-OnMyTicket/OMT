import styled from '../../styles/mainP_S/preview.module.css';

const preview = () => {
  return (
    <div className={styled.allContents}>
      <div className={styled.preview}>
        <iframe
          className={styled.video}
          src='https://www.youtube.com/embed/yjHPb0UpRiQ?autoplay=1&mute=1&loop=1&playlist=yjHPb0UpRiQ'
          title='화사한 그녀 예고편'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
        <strong className={styled.title}>화사한 그녀 </strong>
        <span className={styled.txt}>
          600억을 털어라! <br /> 화사한 '엄정화'의 화끈한
        </span>
        <button className={styled.Ticketing}>
          <p className={styled.TicketingTxt}>예매하기</p>
        </button>
      </div>
    </div>
  );
};

export default preview;
