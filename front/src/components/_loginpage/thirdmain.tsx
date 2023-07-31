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
        <div className={styled.third_Contents}>
          <h3
            className={styled.mainTxt3_1}
            data-aos='fade-right'
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
            data-aos='fade-left'
            data-aos-duration='3000'
          >
            영화관 별 <br />
            이벤트 비교까지
          </h3>
        </div>
        <div className={styled.theater_Layout}>
          <div
            className={styled.theater}
            data-aos='fade-right'
            data-aos-duration='3000'
          >
            <img src='/롯데시네마.png' className={styled.theater_icon} />
            <p className={styled.theater_txt}>롯데시네마</p>
          </div>
          <div
            className={styled.theater}
            data-aos='fade-right'
            data-aos-duration='1500'
          >
            <img src='/CGV.png' className={styled.theater_icon} />
            <p className={styled.theater_txt}>CGV</p>
          </div>
          <div className={styled.theater}>
            <img src='/OMT_web.png' className={styled.theater_icon} />
            <p className={styled.theater_txt}>OMT</p>
          </div>
          <div
            className={styled.theater}
            data-aos='fade-left'
            data-aos-duration='1500'
          >
            <img src='/메가박스.png' className={styled.theater_icon} />
            <p className={styled.theater_txt}>메가박스</p>
          </div>
          <div
            className={styled.theater}
            data-aos='fade-left'
            data-aos-duration='3000'
          >
            <img src='/씨네큐.png' className={styled.theater_icon} />
            <p className={styled.theater_txt}>시네큐</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Third;
