import styled from '@/styles/loginP_S/oauth.module.css';

const Oauth = () => {
  return (
    <>
      <div className={styled.oauth_Layout}>
        <div className={styled.login_Title}>간편하게 로그인하기</div>
        <div className={styled.oauth_Box1}>
          <img src='/네이버.png' className={styled.oauth_Logo} />
          <p className={styled.oauth_Txt}>네이버로 로그인하기</p>
        </div>
        <div className={styled.oauth_Box2}>
          <img src='/카카오.png' className={styled.oauth_Logo} />
          <p className={styled.oauth_Txt}>카카오로 로그인하기</p>
        </div>
        <div className={styled.oauth_Box3}>
          <img src='/구글.png' className={styled.oauth_Logo} />
          <p className={styled.oauth_Txt}>구글로 로그인하기</p>
        </div>
      </div>
    </>
  );
};

export default Oauth;
