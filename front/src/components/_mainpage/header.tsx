'use client';
import Link from 'next/link';
import styled from '../../styles/mainP_S/header.module.css';
import LoginModal from './loginModal';
import Search from './search';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const [UserProfile, setUserProfile] = useState<string | null>(null);
  const [UserName, setUserName] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('UserInfo');

    if (storedUserInfo) {
      try {
        const userInfo = JSON.parse(storedUserInfo);
        setUserName(userInfo.userName);
        setUserProfile(userInfo.imageUrl);
      } catch (error) {
        console.error('Error parsing storedUserInfo:', error);
        // Handle the error accordingly, e.g., set default values or show a message to the user
      }
    }
  }, []);

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <div className={styled.header}>
      <div className={styled.header_content}>
        <div className={styled.conetent}>
          <Link href='/home'>
            <div className={styled.Logo_Content}>
              <img src='/png/OMT_Home_Logo.png' className={styled.logo} />
            </div>
          </Link>
          <ul className={styled.headerInfo}>
            <Search />
            <li>
              <Link href='/ticketing' className={styled.ticketing}>
                예매하기
              </Link>
            </li>
            {UserName ? (
              <>
                <li>
                  <div className={styled.myTickets}>
                    <Link href='/myticket'>My Tickets</Link>
                  </div>
                </li>
                <li className={styled.User}>
                  <img
                    src={UserProfile ? `${UserProfile}` : '/userProfile.svg'}
                    className={styled.UserProfile}
                  />
                  <div className={styled.UserName}>{UserName} 님</div>
                </li>
              </>
            ) : (
              <div className={styled.Login}>
                <p className={styled.Login} onClick={handleClick}>
                  로그인하기
                </p>
                {modalOpen && <LoginModal setModalOpen={setModalOpen} />}
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
