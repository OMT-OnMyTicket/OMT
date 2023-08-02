'use client';

import styled from '@/styles/loginP_S/main.module.css';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const firstmain = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.screenY);
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
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
            영화의 모든 것 <br />
            OMT로 쉽고 간편하게
          </p>
        </div>
        <img className={styled.ScrollDown} src='/ScrollDown.svg'></img>
      </div>
      <div className={styled.secondTitle}>
        <p
          className={styled.secondTitle_Txt}
          data-aos='fade-up'
          data-aos-duration='3000'
        >
          On My Ticket에서는 <br />
          나만의 영화를 모아 정리할 수 있습니다.
          <br /> 내가 관람한 영화를 한눈에 확인해보세요
        </p>
      </div>
    </>
  );
};

export default firstmain;
