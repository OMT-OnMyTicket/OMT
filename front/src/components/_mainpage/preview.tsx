import styled from '../../styles/mainP_S/preview.module.css';

const preview = () => {
  return (
    <div className={styled.allContents}>
      <div className={styled.preview}>
        <video className={styled.video}>영화 예고편</video>
        <strong className={styled.title}>영화 제목</strong>
        <span className={styled.txt}>간략한 영화 설명</span>
        <div className={styled.txt2}>상세보기 or 예매하기</div>
      </div>
    </div>
  );
};

export default preview;
