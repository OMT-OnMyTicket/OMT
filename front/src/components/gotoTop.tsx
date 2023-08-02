'use client';

import { useState, useEffect } from 'react';
import styled from '../styles/support.module.css';

const Support = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

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
