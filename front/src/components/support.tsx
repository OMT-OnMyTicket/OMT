'use client';
import Modal from '../components/modal';
import { useState, useEffect } from 'react';
import styled from '../styles/support.module.css';

const Support = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  // 스크롤 이벤트가 발생했을 때만 move to Top 이 보이게하기

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowScrollButton(scrollTop > 0);
  };

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <img
        src='/avif/logo/OMT_web.avif'
        alt='OMT로고'
        className={styled.container}
        onClick={handleClick}
      />
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
      {showScrollButton && (
        <img
          src='/goToTop.svg'
          onClick={moveToTop}
          className={styled.goToTop}
        />
      )}
    </>
  );
};

export default Support;
