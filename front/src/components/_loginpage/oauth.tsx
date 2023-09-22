import styled from '@/styles/loginP_S/oauth.module.css';

// {URL}/oauth2/authorization/{provider-id}

//  ?redirect_uri=http://localhost:3000/oauth

const URL = process.env.NEXT_PUBLIC_URL;
const Oauth = () => {
  const handleNaverLogin = () => {
    // window.open(`${URL}/oauth/authorization/naver`);
    window.location.href = `${URL}/oauth2/authorization/naver`;
  };

  const handleKakaoLogin = () => {
    window.location.href = `${URL}/oauth2/authorization/kakao`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `${URL}/oauth2/authorization/google`;
  };

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
