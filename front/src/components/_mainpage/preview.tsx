import styled from '../../styles/mainP_S/preview.module.css';
import Link from 'next/link';

const preview = () => {
  return (
    <div className={styled.allContents}>
      <div className={styled.preview}>
        <iframe
          className={styled.video}
          src='https://www.youtube.com/embed/BR5YCAxjbwc?autoplay=1&mute=1&loop=1&playlist=BR5YCAxjbwc'
          title='듄: 파트2 예고편'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
        <strong className={styled.title}>듄: Part2 </strong>
        <span className={styled.txt}>
          전사의 운명을 찾아라 <br />전 세계가 기다린 단 하나의 블록버스터🔥
        </span>
      </div>
    </div>
  );
};

export default preview;
