'use client';

// next.js 13 with AOS 자료 찾기

import styled from '@/styles/loginP_S/main.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Second = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className={styled.second_Container}>
        <div
          className={styled.ticketImgs2}
          data-aos='fade-up'
          data-aos-duration='3000'
          id='Img'
        >
          <img className={styled.ticketImg2_2} src='/ticket2.png' />
          <img className={styled.ticketImg2_1} src='/ticket1.png' />
        </div>
        <div
          className={styled.second_Txt}
          data-aos='fade-up'
          data-aos-duration='3000'
        >
          재미있는 영화로 <br />
          나만의 티켓을 <br />
          만들어보세요
        </div>
      </div>
    </>
  );
};

export default Second;
