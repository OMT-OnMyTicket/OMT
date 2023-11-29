import { useEffect, useRef } from 'react';
import styled from '../styles/support.module.css';
import { useRouter } from 'next/navigation';

interface PropsType {
  setModalOpen: (open: boolean) => void;
}

const Modal = ({ setModalOpen }: PropsType) => {
  const router = useRouter();

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

  const isLogIn = !!localStorage.getItem('UserInfo');

  return (
    <>
      <div ref={modalRef} className={styled.container}>
        <button className={styled.Ticketing}>Book</button>
        <button className={styled.MyTicket}>MyTicket</button>
        {isLogIn ? (
          <button className={styled.Logout} onClick={handleLogOut}>
            Logout
          </button>
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
