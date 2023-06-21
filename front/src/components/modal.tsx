import { useEffect, useRef } from 'react';
import styled from '../styles/support.module.css';

interface PropsType {
  setModalOpen: (open: boolean) => void;
}

const Modal = ({ setModalOpen }: PropsType) => {
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

  return (
    <>
      <div ref={modalRef} className={styled.container}>
        {/* <button className={styled.close} onClick={closeModal}>
          X
        </button> */}
        <button className={styled.Ticketing}>예매하기</button>
        <button className={styled.MyTicket}>MyTicket</button>
        <button className={styled.Logout}>LogOut</button>
      </div>
    </>
  );
};

export default Modal;
