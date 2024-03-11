'use client';

import Header from '@/components/_loginpage/header';
import styled from '../../../styles/myticketP_S/ticketRoom.module.css';
import { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MyMovies from '@/components/_myTicket/myMovies';
import Search from '@/components/_mainpage/search';

const TicketRoom = () => {
  const [UserProfile, setUserProfile] = useState<string | null>(null);
  const [UserName, setUserName] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    AOS.init();
  }, []);

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
  }, []);

  const handleAddTicket = () => {
    setShowSearch(true);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
  };

  const handleClickOutside = (event: any) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      // Clicked outside the search container, close search
      handleCloseSearch();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav>
        <Header />
      </nav>
      <div className={styled.Layout}>
        <div className={styled.TicketRoom}>
          <div
            className={styled.User}
            data-aos='fade-up'
            data-aos-duration='3000'
          >
            <img
              src={UserProfile ? `${UserProfile}` : '/userProfile.svg'}
              className={styled.UserProfile}
            />
            <div className={styled.UserName}>{UserName} 님의 TicketRoom</div>
          </div>
          <div
            className={styled.Support_Txt}
            data-aos='fade-down'
            data-aos-duration='3000'
          >
            {showSearch ? (
              <div className={styled.AddTicket_Search} ref={searchContainerRef}>
                <Search />
              </div>
            ) : (
              <div onClick={handleAddTicket} className={styled.AddTicket}>
                Ticket Room 채우러가기
              </div>
            )}
            {/* <div>정렬 바꾸기</div> */}
          </div>
        </div>
        <div className={styled.myMovies_Layout}>
          <MyMovies />
        </div>
      </div>
    </>
  );
};

export default TicketRoom;
