import styled from '../../styles/mainP_S/preview.module.css';
import Link from 'next/link';

const preview = () => {
  return (
    <div className={styled.allContents}>
      <div className={styled.preview}>
        <iframe
          className={styled.video}
          src='https://www.youtube.com/embed/pMAPj6WVsT4?autoplay=1&mute=1&loop=1&playlist=pMAPj6WVsT4'
          title='범죄도시4 예고편'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          loading='lazy'
        />
        <strong className={styled.title}>범죄도시4 </strong>
        <span className={styled.txt}>
          나쁜 놈들 제대로 뽀개버린다!
          <br />
          마동석의 시원한 액션이 돌아온다.
        </span>
      </div>
    </div>
  );
};

export default preview;
