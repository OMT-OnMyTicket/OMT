'use client';

import Header from '@/components/_loginpage/header';
import styled from '../../styles/myticketP_S/myTicketHome.module.css';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RankedMovie from '@/components/_myTicket/rankmovie';
import ChangeLankModal from '@/components/_myTicket/changeLankModal';
import Link from 'next/link';

const MyTicketHome = () => {
  const [UserProfile, setUserProfile] = useState<string | null>(null);
  const [UserName, setUserName] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
  const handleChangeLack = () => {
    setModalOpen(true);
  };

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
            data-aos='zoom-in-down'
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
              data-aos-duration='2000'
            >
              영화와 함께 한 좋은 추억들을 직접 기록하고 만들어요.
            </div>
          </div>
          <img className={styled.ScrollDown} src='/ScrollDown.svg'></img>
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
            <Link href={'/myticket/ticketroom'}>
              <div>Ticket Room으로 이동</div>
            </Link>
            <div className={styled.change_lank_txt} onClick={handleChangeLack}>
              순위 바꾸기
            </div>
          </div>
          {modalOpen && <ChangeLankModal setModalOpen={setModalOpen} />}
        </div>
        <div className={styled.RankedMovie}>
          <RankedMovie />
        </div>
      </div>
    </>
  );
};

export default MyTicketHome;
