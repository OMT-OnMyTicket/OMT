import styled from '../../styles/mainP_S/preview.module.css';
import Link from 'next/link';

const preview = () => {
  return (
    <div className={styled.allContents}>
      <div className={styled.preview}>
        <iframe
          className={styled.video}
          src='https://www.youtube.com/embed/gXEpZpnImY8?autoplay=1&mute=1&loop=1&playlist=gXEpZpnImY8'
          title='노량: 죽음의 바다 예고편'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
        <strong className={styled.title}>노량: 죽음의 바다 </strong>
        <span className={styled.txt}>
          이순신 3부작의 마침표 <br />
          12월 20일 대개봉
        </span>
      </div>
    </div>
  );
};

export default preview;
