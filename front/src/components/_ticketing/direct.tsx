'use client';

import styled from '../../styles/ticketingP_S/direct.module.css';
import PageCheck from '../../components/pageCheck';
import { useRouter } from 'next/navigation';

const DirectTicketing = () => {
  const router = useRouter();
  const activePage = 1;
  const handleTheaterChoice = (id: string) => {
    localStorage.setItem('영화관', id);
    if (localStorage.영화) {
      router.push('/ticketing/select');
    } else {
      router.push('/ticketing/choice');
    }
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

        <div
          className={styled.Theater_Box1}
          onClick={() => handleTheaterChoice('CGV')}
        >
          <div className={styled.Theater_special}>
            <div>IMAX</div>
            <div>4DX</div>
            <div>SCREEN X</div>
          </div>
          <img
            src='/avif/logo/CGV.avif'
            className={styled.Theater_Logo1}
            alt='CGV_logo'
          />
          <div className={styled.Theater_Title}>
            CGV에서 관람하기
            <img src='/directarrow.svg' className={styled.arrow} />
          </div>
        </div>

        <div
          className={styled.Theater_Box2}
          onClick={() => handleTheaterChoice('MEGABOX')}
        >
          <div className={styled.Theater_special}>
            <div>Dolby</div>
            <div>BOUTIQUE</div>
            <div>MX</div>
          </div>
          <img
            src='/avif/logo/메가박스.avif'
            className={styled.Theater_Logo}
            alt='메가박스_logo'
          />

          <div className={styled.Theater_Title}>
            메가박스에서 관람하기
            <img src='/directarrow.svg' className={styled.arrow} />
          </div>
        </div>

        <div
          className={styled.Theater_Box3}
          onClick={() => handleTheaterChoice('LOTTE')}
        >
          <div className={styled.Theater_special}>
            <div>S PLEX</div>
            <div>SUPER S</div>
            <div>SUPER 4D</div>
          </div>
          <img
            src='/avif/logo/롯데시네마.avif'
            className={styled.Theater_Logo}
            alt='롯데시네마_logo'
          />
          <div className={styled.Theater_Title}>
            롯데시네마에서 관람하기
            <img src='/directarrow.svg' className={styled.arrow} alt='화살표' />
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectTicketing;
