import styled from '@/styles/loginP_S/oauth.module.css';

const Oauth = () => {
  return (
    <>
      <div className={styled.oauth_Layout}>
        <ul className={styled.oauth_ul}>
          <li className={styled.oauth_li}>
            <div className={styled.oauth_li_Txt}>
              <div className={styled.oauth_Naming_Layout}>
                <div className={styled.oauth_name1}>Naver</div>
                <img src='/네이버.png' className={styled.oauth_Logo} />
              </div>
              <div className={styled.Login_Txt}>네이버로 로그인하기</div>
              <div className={styled.Login_Txt_M}>Login</div>
              <img src='/arrow.svg' className={styled.oauth_arrow} />
            </div>
          </li>
          <li className={styled.oauth_li}>
            <div className={styled.oauth_li_Txt}>
              <div className={styled.oauth_Naming_Layout}>
                <div className={styled.oauth_name2}>Kakao</div>
                <img src='/카카오.png' className={styled.oauth_Logo} />
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
                <img src='/구글.png' className={styled.oauth_Logo} />
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
