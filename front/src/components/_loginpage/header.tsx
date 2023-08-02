'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from '@/styles/loginP_S/header.module.css';

const Header = () => {
  const [loginClicked, setLoginClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header');

      if (header) {
        if (window.scrollY > 0) {
          header.style.backgroundColor = 'black';
          header.style.color = 'white';
        } else {
          header.style.backgroundColor = 'transparent';
          header.style.color = 'black';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleLoginClick() {
    setLoginClicked(true);

    // 로그인 버튼을 눌렀을 때 화면을 가장 아래로 스크롤
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  return (
    <>
      <div id='header' className={styled.Layout}>
        <Link href='/home' className={styled.Home}>
          Home
        </Link>
        <div className={styled.Login} onClick={handleLoginClick}>
          Login
        </div>
      </div>
    </>
  );
};

export default Header;
