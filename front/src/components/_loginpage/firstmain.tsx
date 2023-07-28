'use client';

import styled from '@/styles/loginP_S/main.module.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const firstmain = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className={styled.Container}>
        <div
          className={styled.Title}
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          ON MY TICKET
        </div>
        <div className={styled.subTitle}>
          <p data-aos='fade-up' data-aos-duration='3000'>
            On My Ticket에서는 <br />
            나만의 영화를 모아 정리할 수 있습니다.
            <br /> 내가 관람한 영화를 한눈에 확인해보세요
          </p>
        </div>
        <div className={styled.imgLayout}>
          <img className={styled.ticketImg1} src='/ticket1.png' />
          <img className={styled.ticketImg2} src='/ticket2.png' />
        </div>
      </div>
    </>
  );
};

export default firstmain;
