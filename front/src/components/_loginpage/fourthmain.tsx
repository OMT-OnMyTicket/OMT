'use client';

import styled from '@/styles/loginP_S/main.module.css';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Fourth = () => {
  const [loginClicked, setLoginClicked] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  // 로그인 버튼
  function handleLoginClick() {
    setLoginClicked(true);

    // 로그인 버튼을 눌렀을 때 화면을 가장 아래로 스크롤
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  return (
    <>
      <div className={styled.fourth_Container}>
        <div className={styled.IMG_layout}>
          <div className={styled.Txt_Layout}>
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
      </div>
    </>
  );
};

export default Fourth;
