'use client';

import Oauth from './oauth';
import styled from '@/styles/loginP_S/oauth.module.css';

const Loginpage = () => {
  return (
    <>
      <div className={styled.login_Layout}>
        <div className={styled.login_Back}>
          <div>
            <div className={styled.Txt_Layout}>
              <p className={styled.login_Txt1}>LOGIN</p>
              <p className={styled.login_Txt2}>소셜 로그인으로 간편하게.</p>
            </div>

            <div className={styled.OauthBox}>
              <Oauth />
            </div>
          </div>
          <div className={styled.Character_Position}>
            <img
              className={styled.Character}
              src='/png/캐릭터.png'
              alt='캐릭터이미지'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
