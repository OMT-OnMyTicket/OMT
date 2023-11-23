import { useEffect, useRef } from 'react';
import styled from '../../styles/mainP_S/loginModal.module.css';
import { useRouter } from 'next/navigation';

interface PropsType {
  setModalOpen: (open: boolean) => void;
}

const URL = process.env.NEXT_PUBLIC_URL;

const Modal = ({ setModalOpen }: PropsType) => {
  const router = useRouter();

  const closeModal = () => {
    setModalOpen(false);
  };
  // 모달 외부 클릭시 끄기 기능
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event?: MouseEvent) => {
      if (event) {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          setModalOpen(false);
        }
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  const handleNaverLogin = () => {
    router.push(
      `${URL}/oauth2/authorization/naver?redirect_uri=http://localhost:3000/login`
    );
  };

  const handleKakaoLogin = () => {
    router.push(
      `${URL}/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/login`
    );
  };

  const handleGoogleLogin = () => {
    router.push(
      `${URL}/oauth2/authorization/google?redirect_uri=http://localhost:3000/login`
    );
  };

  return (
    <>
      <div ref={modalRef} className={styled.container}>
        <div className={styled.OauthTxt}>SNS 간편로그인</div>
        <div className={styled.OauthBtns}>
          <button className={styled.OauthBtn}>
            <img
              src='/png/네이버.png'
              className={styled.oauth_Logo}
              onClick={handleNaverLogin}
            />
            <p className={styled.LoginTxt}>네이버 로그인</p>
          </button>
          <button className={styled.OauthBtn}>
            <img
              src='/png/카카오.png'
              className={styled.oauth_Logo}
              onClick={handleKakaoLogin}
            />
            <p className={styled.LoginTxt}>카카오 로그인</p>
          </button>
          <button className={styled.OauthBtn}>
            <img
              src='/png/구글.png'
              className={styled.oauth_Logo}
              onClick={handleGoogleLogin}
            />
            <p className={styled.LoginTxt}>구글 로그인</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
