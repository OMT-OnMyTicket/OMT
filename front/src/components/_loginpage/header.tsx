'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import styled from '@/styles/loginP_S/header.module.css';

const Header = () => {
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

  return (
    <>
      <div id='header' className={styled.Layout}>
        <Link href='/home' className={styled.Home}>
          Home
        </Link>
        <Link href='/' className={styled.Login}>
          Login
        </Link>
      </div>
    </>
  );
};

export default Header;
