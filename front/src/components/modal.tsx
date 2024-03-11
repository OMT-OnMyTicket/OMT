import { useEffect, useRef } from 'react';
import styled from '../styles/support.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_URL;

interface PropsType {
  setModalOpen: (open: boolean) => void;
}

const Modal = ({ setModalOpen }: PropsType) => {
  const router = useRouter();
  const { accessToken, setAccessToken } = useAuth();
  // Turn off function when clicking outside the modal
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // event handler function
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

    // Register event handler
    document.addEventListener('mousedown', handler);
    // document.addEventListener('touchstart', handler); // Mobile response

    return () => {
      // Release event handler
      document.removeEventListener('mousedown', handler);
      // document.removeEventListener('touchstart', handler); // Mobile response
    };
  });

  const handleLogOut = () => {
    localStorage.clear();
    router.push('/');
  };
  const handleLogin = () => {
    router.push('/');
  };
  const handleTicketing = () => {
    router.push('/ticketing');
  };

  const isLogIn = !!localStorage.getItem('UserInfo');

  const CheckToken = () => {
    console.log(accessToken);
    axios
      .get(`${URL}/api/all/v1/auth/refresh`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      .then((res) => {
        if (res.data.header.code === 500) {
          console.log(res);
          console.log(res.data.header.message);
        } else if (res.data.header.code === 200) {
          // const newAccessToken = res.data
          // setAccessToken(newAccessToken)
          console.log('토큰갱신에 성공했습니다.');
          console.log(res);
        }
      })
      .catch((err) => console.log('CheckToken err:', err));
  };

  return (
    <>
      <div ref={modalRef} className={styled.container}>
        <button className={styled.Ticketing} onClick={handleTicketing}>
          예매하기
        </button>
        {isLogIn ? (
          <>
            <button className={styled.Logout} onClick={handleLogOut}>
              Logout
            </button>
            {/* <button className={styled.MyTicket}>MyTicket</button> */}
            {/* <button className={styled.MyTicket} onClick={CheckToken}>
              Token
            </button> */}
          </>
        ) : (
          <button className={styled.Logout} onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </>
  );
};

export default Modal;
