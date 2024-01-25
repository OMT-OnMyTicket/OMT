import styled from '@/styles/loginP_S/oauth.module.css';
import { useRouter } from 'next/navigation';

const URL = process.env.NEXT_PUBLIC_URL;
const Oauth = () => {
  const router = useRouter();

  // Main 버전
  const handleNaverLogin = () => {
    router.push(
      `${URL}/oauth2/authorization/naver?redirect_uri=https://omt-onmyticket.vercel.app/login`
    );
  };

  const handleKakaoLogin = () => {
    router.push(
      `${URL}/oauth2/authorization/kakao?redirect_uri=https://omt-onmyticket.vercel.app/login`
    );
  };

  const handleGoogleLogin = () => {
    router.push(
      `${URL}/oauth2/authorization/google?redirect_uri=https://omt-onmyticket.vercel.app/login`
    );
  };

  // 로컬버전

  // const handleNaverLogin = () => {
  //   router.push(
  //     `${URL}/oauth2/authorization/naver?redirect_uri=http://localhost:3000/login`
  //   );
  // };

  // const handleKakaoLogin = () => {
  //   router.push(
  //     `${URL}/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/login`
  //   );
  // };

  // const handleGoogleLogin = () => {
  //   router.push(
  //     `${URL}/oauth2/authorization/google?redirect_uri=http://localhost:3000/login`
  //   );
  // };

  return (
    <>
      <div className={styled.oauth_Layout}>
        <ul className={styled.oauth_ul}>
          <li className={styled.oauth_li}>
            <div className={styled.oauth_li_Txt} onClick={handleNaverLogin}>
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
            <div className={styled.oauth_li_Txt} onClick={handleKakaoLogin}>
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
            <div className={styled.oauth_li_Txt} onClick={handleGoogleLogin}>
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

export default Oauth;
