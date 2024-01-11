'use client';
import { useEffect, useState } from 'react';

import styled from '@/styles/loginP_S/header.module.css';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [loginClicked, setLoginClicked] = useState(false);
  const [UserProfile, setUserProfile] = useState<string | null>(null);
  const [UserName, setUserName] = useState<string | null>(null);

  const router = useRouter();

  const handleHome = () => {
    const userInfo = localStorage.getItem('UserInfo');
    const Token = localStorage.getItem('Token');
    localStorage.clear();
    if (userInfo && Token) {
      localStorage.setItem('UserInfo', userInfo);
      localStorage.setItem('Token', Token);
    }
    router.push('/home');
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('UserInfo');
    if (storedUserInfo) {
      try {
        const userInfo = JSON.parse(storedUserInfo);
        setUserName(userInfo.userName);
        setUserProfile(userInfo.imageUrl);
      } catch (error) {
        console.error('Error parsing storedUserInfo:', error);
      }
    }

    const handleScroll = () => {
      const header = document.getElementById('header');

      if (header) {
        if (window.scrollY > 0) {
          header.style.backgroundColor = 'black';
          header.style.color = 'white';
        } else {
          header.style.backgroundColor = 'white';
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
        <div className={styled.Home} onClick={handleHome}>
          Home
        </div>
        {UserName ? (
          <>
            <li className={styled.User}>
              <img
                src={UserProfile ? `${UserProfile}` : '/userProfile.svg'}
                className={styled.UserProfile}
              />
              <div className={styled.UserName}>{UserName} 님</div>
            </li>
          </>
        ) : (
          <div className={styled.Login} onClick={handleLoginClick}>
            Login
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
