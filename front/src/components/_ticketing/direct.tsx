'use client';

import styled from '../../styles/ticketingP_S/direct.module.css';
import PageCheck from '../../components/pageCheck';
import Link from 'next/link';

const DirectTicketing = () => {
  const activePage = 1;
  const handleTheaterChoice = (id: string) => {
    localStorage.setItem('영화관', id);
  };

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
        <Link href='/ticketing/choice'>
          <div
            className={styled.Theater_Box1}
            onClick={() => handleTheaterChoice('CGV')}
          >
            <div className={styled.Theater_special}>
              <div>IMAX</div>
              <div>4DX</div>
              <div>SCREEN X</div>
            </div>
            <img src='/png/CGV.png' className={styled.Theater_Logo1} />
            <div className={styled.Theater_Title}>
              CGV에서 관람하기
              <img src='/directarrow.svg' className={styled.arrow} />
            </div>
          </div>
        </Link>
        <Link href='/ticketing/choice'>
          <div
            className={styled.Theater_Box2}
            onClick={() => handleTheaterChoice('메가박스')}
          >
            <div className={styled.Theater_special}>
              <div>Dolby</div>
              <div>BOUTIQUE</div>
              <div>MX</div>
            </div>
            <img src='/png/메가박스.png' className={styled.Theater_Logo} />

            <div className={styled.Theater_Title}>
              메가박스에서 관람하기
              <img src='/directarrow.svg' className={styled.arrow} />
            </div>
          </div>
        </Link>
        <Link href='/ticketing/choice'>
          <div
            className={styled.Theater_Box3}
            onClick={() => handleTheaterChoice('롯데시네마')}
          >
            <div className={styled.Theater_special}>
              <div>S PLEX</div>
              <div>SUPER S</div>
              <div>SUPER 4D</div>
            </div>
            <img src='/png/롯데시네마.png' className={styled.Theater_Logo} />
            <div className={styled.Theater_Title}>
              롯데시네마에서 관람하기
              <img src='/directarrow.svg' className={styled.arrow} />
            </div>
          </div>
        </Link>
        <Link href='/ticketing/choice'>
          <div
            className={styled.Theater_Box4}
            onClick={() => handleTheaterChoice('씨네큐')}
          >
            <div className={styled.Theater_special}>
              <div>RESERVE</div>
              <div>&</div>
              <div>SUITE</div>
            </div>
            <img className={styled.Theater_Logo} src='/png/씨네큐.png' />
            <div className={styled.Theater_Title}>
              시네큐에서 관람하기
              <img src='/directarrow.svg' className={styled.arrow} />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default DirectTicketing;
