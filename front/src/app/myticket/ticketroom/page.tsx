'use client';

import Header from '@/components/_loginpage/header';
import styled from '../../../styles/myticketP_S/ticketRoom.module.css';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MyMovies from '@/components/_myTicket/myMovies';

const TicketRoom = () => {
  const [UserProfile, setUserProfile] = useState<string | null>(null);
  const [UserName, setUserName] = useState<string | null>(null);

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
            <div>Ticket Room 채우러가기</div>
            <div>순위 바꾸기</div>
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
