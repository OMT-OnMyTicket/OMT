'use client';

import Header from '@/components/_loginpage/header';
import styled from '../../../styles/myticketP_S/ticketRoom.module.css';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Search from '@/components/_mainpage/search';

const TicketRoom = () => {
  const [UserProfile, setUserProfile] = useState<string | null>(null);
  const [UserName, setUserName] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);

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

  const handleEmptyTicketClick = () => {
    setShowSearch(true);
  };

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

        {showSearch ? (
          <div className={styled.Search}>
            <Search />
          </div>
        ) : (
          <div className={styled.emptyTicket} onClick={handleEmptyTicketClick}>
            <div className={styled.emptyTxt}>TicketRoom이 비어있습니다.</div>
            <div className={styled.empty_SubTxt}>
              위 메시지를 클릭하면 검색창이 나옵니다.
            </div>
            <div className={styled.empty_SubTxt}>
              영화를 검색하고 나만의 Ticket Room을 채워보세요.
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TicketRoom;
