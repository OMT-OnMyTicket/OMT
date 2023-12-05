import styled from '../../styles/mainP_S/preview.module.css';
import Link from 'next/link';

const preview = () => {
  return (
    <div className={styled.allContents}>
      <div className={styled.preview}>
        <iframe
          className={styled.video}
          src='https://www.youtube.com/embed/-AZ7cnwn2YI?autoplay=1&mute=1&loop=1&playlist=-AZ7cnwn2YI'
          title='서울의 봄 예고편'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
        <strong className={styled.title}>서울의 봄 </strong>
        <span className={styled.txt}>
          1979.12.12 그날 밤 <br />
          철저하게 감춰진 9시간
        </span>
      </div>
    </div>
  );
};

export default preview;
