import styled from '../../styles/mainP_S/preview.module.css';
import Link from 'next/link';

const preview = () => {
  return (
    <div className={styled.allContents}>
      <div className={styled.preview}>
        <iframe
          className={styled.video}
          src='https://www.youtube.com/embed/6kjApj4YXgY?autoplay=1&mute=1&loop=1&playlist=6kjApj4YXgY'
          title='댓글부대 예고편'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          loading='lazy'
        />
        <strong className={styled.title}>댓글부대 </strong>
        <span className={styled.txt}>
          “기자님 기사 오보 아니었어요.
          <br /> 다 저희들이 만든 수법이에요”
        </span>
      </div>
    </div>
  );
};

export default preview;
