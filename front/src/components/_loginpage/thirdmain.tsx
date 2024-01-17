'use client';

// next.js 13 with AOS 자료 찾기

import styled from '@/styles/loginP_S/main.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Third = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      {/* 첫번째 섹션 */}
      <div className={styled.third_Container}>
        <div
          className={styled.third_header}
          data-aos='fade-up'
          data-aos-duration='2000'
        >
          <h1 className={styled.mainTxt2_1}>TICKETING</h1>
          <h2 className={styled.mainTxt2_2}>
            예매, <br />
            모든 예매를 한 곳에서
          </h2>
        </div>

        {/* 두번째 섹션 */}

        <div className={styled.theater_Layout}>
          <div
            className={styled.theater}
            data-aos='fade-down'
            data-aos-duration='3000'
          >
            <img src='/png/롯데시네마.png' className={styled.theater_icon} />
          </div>
          <div
            className={styled.theater}
            data-aos='fade-down'
            data-aos-duration='1500'
          >
            <img src='/png/CGV.png' className={styled.theater_icon} />
          </div>
          <div className={styled.theater1}>
            <img src='/png/OMT_web.png' className={styled.theater_icon} />
          </div>
          <div
            className={styled.theater}
            data-aos='fade-down'
            data-aos-duration='1500'
          >
            <img src='/png/메가박스.png' className={styled.theater_icon} />
          </div>
        </div>

        {/* 세번째 섹션 */}

        <div className={styled.third_Contents}>
          <h3
            className={styled.mainTxt3_1}
            data-aos='fade-down'
            data-aos-duration='2000'
          >
            모든 영화관을 <br />한 곳에서
          </h3>
          <div data-aos='fade-up' data-aos-duration='1000' id='Img'>
            <img
              src='https://static.toss.im/screens/iPhone12_Clay_Shadow.png'
              className={styled.phoneImg}
            />
          </div>

          <h3
            className={styled.mainTxt3_1}
            data-aos='fade-down'
            data-aos-duration='3000'
          >
            영화관 별 <br />
            비교까지
          </h3>
          <div
            className={styled.phone_Content}
            data-aos='fade-up'
            data-aos-duration='3000'
            id='Img'
          >
            <img className={styled.phoneTop} src='/png/phoneTop.png' />
            <img className={styled.phoneBtm} src='/png/phoneBtm.png' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Third;
