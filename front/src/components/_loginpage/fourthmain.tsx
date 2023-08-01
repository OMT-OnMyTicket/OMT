'use client';

import Oauth from './oauth';
import styled from '@/styles/loginP_S/main.module.css';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Fourth = () => {
  const [position, setPosition] = useState(0);
  const [loginClicked, setLoginClicked] = useState(false);

  function onScroll() {
    console.log(window.scrollY);
    setPosition(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  useEffect(() => {
    AOS.init();
  }, []);

  // 로그인 버튼
  function handleLoginClick() {
    setLoginClicked(true);
  }

  return (
    <>
      <div className={styled.fourth_Container}>
        <div
          className={styled.IMG_layout}
          style={{
            backgroundImage: loginClicked
              ? "url('/loginIMG.jpg')"
              : "url('/background.png')"
          }}
        >
          <div
            className={styled.Txt_Layout}
            style={{ display: loginClicked ? 'none' : 'flex' }}
          >
            <p
              className={styled.fourth_Title}
              data-aos='fade-down'
              data-aos-duration='1000'
            >
              당신의 소중한 추억.
            </p>
            <p
              className={styled.fourth_Txt}
              data-aos='fade-down'
              data-aos-duration='3000'
            >
              ON MY TICKET과 함께
            </p>
            <div
              className={styled.login_Btn}
              data-aos='fade-down'
              data-aos-duration='3000'
              onClick={handleLoginClick}
            >
              로그인하기
            </div>
          </div>
        </div>
        <div style={{ display: loginClicked ? 'flex' : 'none' }}>
          <Oauth />
        </div>
      </div>
    </>
  );
};

export default Fourth;
