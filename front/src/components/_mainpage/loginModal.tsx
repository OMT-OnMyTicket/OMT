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
    document.body.style.overflow = 'hidden'; // 모달 생성시 스크롤 금지
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
      document.body.style.overflow = 'unset'; // 모달 생성시 스크롤 금지
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  const handleNaverLogin = () => {
    router.push(
      `${URL}/oauth2/authorization/naver?redirect_uri=http://localhost:3000/login`
    );
    // router.push(
    //   `${URL}/oauth2/authorization/naver?redirect_uri=https://omt-onmyticket.vercel.app/login`
    // );
  };

  const handleKakaoLogin = () => {
    router.push(
      `${URL}/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/login`
    );
    // router.push(
    //   `${URL}/oauth2/authorization/kakao?redirect_uri=https://omt-onmyticket.vercel.app/login`
    // );
  };

  const handleGoogleLogin = () => {
    // router.push(
    //   `${URL}/oauth2/authorization/google?redirect_uri=http://localhost:3000/login`
    // );
    router.push(
      `${URL}/oauth2/authorization/google?redirect_uri=https://omt-onmyticket.vercel.app/login`
    );
    // 메인 배포에서 발생되는 url
    // http://ec2-3-34-47-93.ap-northeast-2.compute.amazonaws.com:8080/login/oauth2/code/google?state=GB180u0rA6dJ3CaMOl7XwMrybf7gpMIb3khlQ-pFeRE%3D&code=4%2F0AfJohXl_oaYdUSWeZMM45t5Z9atgKkphWamDoRAz3Z8s-xbUIrTVEWmnMMuqv87JlCrwcg&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=1&prompt=consent
  };

  return (
    <>
      <div ref={modalRef} className={styled.container}>
        <div className={styled.OauthTxt}>SNS 간편로그인</div>
        <div className={styled.loginBox}>
          <div className={styled.naver} onClick={handleNaverLogin}>
            <img src={'/png/네이버.png'} className={styled.login_Logo} />
            <p>네이버로 로그인하기</p>
          </div>
          <div className={styled.kakao} onClick={handleKakaoLogin}>
            <img src={'/png/카카오.png'} className={styled.login_Logo} />
            <p>카카오로 로그인하기</p>
          </div>
          <div className={styled.google} onClick={handleGoogleLogin}>
            <img src={'/png/구글.png'} className={styled.login_Logo} />
            <p>구글로 로그인하기</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
