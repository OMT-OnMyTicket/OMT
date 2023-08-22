import styled from '../../styles/ticketingP_S/direct.module.css';
import PageCheck from '../../components/pageCheck';

const DirectTicketing = () => {
  const activePage = 1;

  return (
    <>
      <div className={styled.Container}>
        <div className={styled.Direct_Txts}>
          <div className={styled.Direct_Title}>직접예매</div>
          <div className={styled.PageCheck_Layout}>
            <div className={styled.Direct_Txt}>영화관 선택하기</div>
            <PageCheck activePage={activePage} />
          </div>
        </div>
        <div className={styled.Theater_Box1}>
          <div className={styled.Theater_special}>
            <div>IMAX</div>
            <div>4DX</div>
            <div>SCREEN X</div>
          </div>
          <img src='/CGV.png' className={styled.Theater_Logo1} />

          <div className={styled.Theater_Title}>
            CGV에서 관람하기
            <img src='/directarrow.svg' className={styled.arrow} />
          </div>
        </div>
        <div className={styled.Theater_Box2}>
          <div className={styled.Theater_special}>
            <div>Dolby</div>
            <div>BOUTIQUE</div>
            <div>MX</div>
          </div>
          <img src='/메가박스.png' className={styled.Theater_Logo} />

          <div className={styled.Theater_Title}>
            메가박스에서 관람하기
            <img src='/directarrow.svg' className={styled.arrow} />
          </div>
        </div>
        <div className={styled.Theater_Box3}>
          <div className={styled.Theater_special}>
            <div>S PLEX</div>
            <div>SUPER S</div>
            <div>SUPER 4D</div>
          </div>
          <img src='/롯데시네마.png' className={styled.Theater_Logo} />

          <div className={styled.Theater_Title}>
            롯데시네마에서 관람하기
            <img src='/directarrow.svg' className={styled.arrow} />
          </div>
        </div>
        <div className={styled.Theater_Box4}>
          <div className={styled.Theater_special}>
            <div>RESERVE</div>
            <div>&</div>
            <div>SUITE</div>
          </div>
          <img className={styled.Theater_Logo} src='/씨네큐.png' />
          <div className={styled.Theater_Title}>
            시네큐에서 관람하기
            <img src='/directarrow.svg' className={styled.arrow} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectTicketing;
