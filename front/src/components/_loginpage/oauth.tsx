import styled from '@/styles/loginP_S/oauth.module.css';
import { useRouter } from 'next/navigation';

interface OAuthButtonProps {
  provider: string;
  name: string;
}

const URL = process.env.NEXT_PUBLIC_URL;
const MAINURL = process.env.NEXT_MAIN_PUBLIC_URL;
const OAuthButton: React.FC<OAuthButtonProps> = ({ provider, name }) => {
  const router = useRouter();

  const handleClick = () => {
    const currentUrl = window.location.href;

    // 시작 URL이 localhost3000인지 체크
    const isLocal = currentUrl.startsWith('http://localhost:3000');

    const redirectUri = isLocal
      ? 'http://localhost:3000/login'
      : 'https://omt-onmyticket.vercel.app/login';

    router.push(
      `${MAINURL}/oauth2/authorization/${provider}?redirect_uri=${redirectUri}`
    );
  };

  return (
    <li className={styled.oauth_li}>
      <div className={styled.oauth_li_Txt} onClick={handleClick}>
        <div className={styled.oauth_Naming_Layout}>
          <div className={styled.oauth_name}>{name}</div>
          <img src={`/png/${provider}.png`} className={styled.oauth_Logo} />
        </div>
        <div className={styled.Login_Txt}>{`${name}로 로그인하기`}</div>
        <div className={styled.Login_Txt_M}>Login</div>
        <img src='/arrow.svg' className={styled.oauth_arrow} />
      </div>
    </li>
  );
};

const Oauth: React.FC = () => {
  const providers = [
    { provider: 'naver', name: 'Naver' },
    { provider: 'kakao', name: 'Kakao' },
    { provider: 'google', name: 'Google' }
  ];

  return (
    <div className={styled.oauth_Layout}>
      <ul className={styled.oauth_ul}>
        {providers.map((provider, index) => (
          <OAuthButton key={index} {...provider} />
        ))}
      </ul>
    </div>
  );
};

export default Oauth;
