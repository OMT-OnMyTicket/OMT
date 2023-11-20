import Link from 'next/link';
import styled from '../../styles/mainP_S/header.module.css';
import LoginModal from './loginModal';
import Search from './search';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  // const UserProfile = localStorage.getItem('userProfile');
  // const profileImage = UserProfile ? `${UserProfile}` : '/userProfile.svg';
  // const Userid = localStorage.getItem('userId');
  // const UserName = localStorage.getItem('userName');
  // const LoginCheck = Userid ? `${UserName}` : `로그인하기`;
  const router = useRouter();
  const [UserName, setUserName] = useState<string | null>(null);
  const [UserProfile, setUserProfile] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      setUserProfile(storedUserProfile);
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
              <img src='/png/OMT_web.png' className={styled.logo} />
              <p className={styled.Logo_Content_Txt}>영화의 모든 것</p>
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
                  <Link href='/' className={styled.myTickets}>
                    My Tickets
                  </Link>
                </li>
                <li className={styled.User}>
                  <img
                    src={UserProfile ? `${UserProfile}` : '/userProfile.svg'}
                    className={styled.UserProfile}
                  />
                  <div className={styled.UserName}>{UserName}</div>
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
