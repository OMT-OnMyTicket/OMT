'use client';

import Header from '@/components/_loginpage/header';
import styled from '../../styles/myticketP_S/myTicketHome.module.css';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LankedMovie from '@/components/_myTicket/lankmovie';

const MyTicketHome = () => {
  const [UserProfile, setUserProfile] = useState<string | null>(null);
  const [UserName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('UserInfo');

    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setUserName(userInfo.userName);
      setUserProfile(userInfo.imageUrl);
    }
  }, []);

  return (
    <>
      <nav>
        <Header />
      </nav>
      <div className={styled.Layout}>
        <div className={styled.Container}>
          <img
            src='/png/light.png'
            className={styled.lignt}
            data-aos='fade-down'
            data-aos-duration='1500'
          />

          <div className={styled.Home_Txt}>
            <div
              className={styled.Home_Txt1}
              data-aos='fade-down'
              data-aos-duration='2000'
            >
              On My Ticket과 함께하는 나만의 티켓 만들기
            </div>
            <div
              className={styled.Home_Txt2}
              data-aos='fade-down'
              data-aos-duration='3000'
            >
              영화와 함께 한 좋은 추억들을 직접 기록하고 만들어요.
            </div>
          </div>
        </div>
      </div>

      {/* Ticket_Room */}

      <div className={styled.Layout2}>
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
            <div>나만의 영화 순위</div>
            <div>전체 보기</div>
          </div>
        </div>
        <LankedMovie />
      </div>
    </>
  );
};

export default MyTicketHome;
