import { useEffect, useRef } from 'react';
import styled from '../../styles/mainP_S/loginModal.module.css';
import { useRouter } from 'next/navigation';

interface PropsType {
  setModalOpen: (open: boolean) => void;
}

const URL = process.env.NEXT_PUBLIC_URL;
const MAINURL = process.env.NEXT_MAIN_PUBLIC_URL;
const Modal = ({ setModalOpen }: PropsType) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event?: MouseEvent) => {
      if (
        event &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handler);
      document.body.style.overflow = 'unset';
    };
  }, [setModalOpen]);

  const handleLogin = (provider: string) => {
    const currentUrl = window.location.href;

    // Check if the starting URL is localhost:3000
    const isLocal = currentUrl.startsWith('http://localhost:3000');

    // Set the base URL accordingly
    const baseURL = isLocal ? URL : MAINURL;

    const redirectUri = isLocal
      ? 'http://localhost:3000/login'
      : 'https://omt-onmyticket.vercel.app/login';

    router.push(
      `${baseURL}/oauth2/authorization/${provider}?redirect_uri=${redirectUri}`
    );
  };

  return (
    <div ref={modalRef} className={styled.container}>
      <div className={styled.OauthTxt}>SNS 간편로그인</div>
      <div className={styled.loginBox}>
        {['naver', 'kakao', 'google'].map((provider) => (
          <div
            key={provider}
            className={styled[provider]}
            onClick={() => handleLogin(provider)}
          >
            <img
              src={`/png/${
                provider.charAt(0).toUpperCase() + provider.slice(1)
              }.png`}
              className={styled.login_Logo}
            />
            <p>{` ${
              provider.charAt(0).toUpperCase() + provider.slice(1)
            } 로 로그인`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modal;
