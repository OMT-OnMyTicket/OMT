'use client';
import styled from '@/styles/loginP_S/oauth.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';

// {URL}/oauth2/authorization/{provider-id}

//  ?redirect_uri=http://localhost:3000/oauth
// URL= http://ec2-3-34-47-93.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google

// RestAPI키  =  468cacaab5571ffd638f603554a8446d
// Client Secret키 = hzbzLB1w1kFv5a1hkQM2EVfYAHaOvkos

// const URL = process.env.NEXT_PUBLIC_URL;
const Page = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className={styled.oauth_Layout}>
        <ul className={styled.oauth_ul}>
          <li className={styled.oauth_li}>
            <div className={styled.oauth_li_Txt} onClick={() => signIn()}>
              <div className={styled.oauth_Naming_Layout}>
                <div className={styled.oauth_name1}>Naver</div>
                <img src='/png/네이버.png' className={styled.oauth_Logo} />
              </div>
              <div className={styled.Login_Txt}>네이버로 로그인하기</div>
              <div className={styled.Login_Txt_M}>Login</div>
              <img src='/arrow.svg' className={styled.oauth_arrow} />
            </div>
          </li>
          <li className={styled.oauth_li}>
            <div
              className={styled.oauth_li_Txt}
              onClick={(e) => {
                e.preventDefault();
                signIn('kakao', {
                  callbackUrl: 'http://localhost:3000/api/auth/callback/kakao'
                });
              }}
            >
              <div className={styled.oauth_Naming_Layout}>
                <div className={styled.oauth_name2}>Kakao</div>
                <img src='/png/카카오.png' className={styled.oauth_Logo} />
              </div>
              <div className={styled.Login_Txt}>카카오로 로그인하기</div>
              <div className={styled.Login_Txt_M}>Login</div>
              <img src='/arrow.svg' className={styled.oauth_arrow} />
            </div>
          </li>
          <li className={styled.oauth_li}>
            <div className={styled.oauth_li_Txt}>
              <div className={styled.oauth_Naming_Layout}>
                <div className={styled.oauth_name3}>Google</div>
                <img src='/png/구글.png' className={styled.oauth_Logo} />
              </div>
              <div className={styled.Login_Txt}>구글로 로그인하기</div>
              <div className={styled.Login_Txt_M}>Login</div>
              <img src='/arrow.svg' className={styled.oauth_arrow} />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Page;
