'use client';

import Oauth from './oauth';
import styled from '@/styles/loginP_S/oauth.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Loginpage = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className={styled.login_Layout}>
        <div
          className={styled.login_Txt}
          data-aos='fade-up'
          data-aos-duration='2000'
        >
          <p className={styled.login_Txt1}>LOGIN</p>
          <p className={styled.login_Txt2}>
            소셜 로그인으로 <br />
            간편하게.
          </p>
        </div>
        <div
          className={styled.OauthBox}
          data-aos='fade-up'
          data-aos-duration='3000'
        >
          <Oauth />
        </div>
      </div>
    </>
  );
};

export default Loginpage;
