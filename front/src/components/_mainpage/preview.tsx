import styled from '../../styles/mainP_S/preview.module.css';
import Link from 'next/link';

const preview = () => {
  return (
    <div className={styled.allContents}>
      <div className={styled.preview}>
        <iframe
          className={styled.video}
          src='https://www.youtube.com/embed/rjW9E1BR_30?autoplay=1&mute=1&loop=1&playlist=rjW9E1BR_30'
          title='파묘 예고편'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          loading='lazy'
        />
        <strong className={styled.title}>파묘 </strong>
        <span className={styled.txt}>
          "뭐가 나왔다고 거기서, 겁나 험한 게" <br />
          모두가 기다린 오컬트 미스터리
        </span>
      </div>
    </div>
  );
};

export default preview;
