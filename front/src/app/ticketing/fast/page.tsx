'use client';

import Header from '@/components/_loginpage/header';
import styled from '../../../styles/ticketingP_S/page/ticketing.module.css';
import React, { useEffect, useState } from 'react';
import PageCheck from '@/components/pageCheck';

import KakaoMap from '@/components/_ticketing/fast/kakaoMap';

const FastTheater = () => {
  const [TicketingWay, setTicketingWay] = useState<string | null>(null);
  const activePage = 3;
  useEffect(() => {
    const storedTicketWay = localStorage.getItem('예매방법');
    if (storedTicketWay) {
      setTicketingWay(storedTicketWay);
    }
  }, []);

  return (
    <div>
      <nav>
        <Header />
      </nav>
      <div className={styled.Container}>
        <div className={styled.Choice_Txts}>
          <div className={styled.Choice_Title}>{TicketingWay}</div>
          <div className={styled.PageCheck_Layout}>
            <div className={styled.Choice_Txt}>영화관 선택하기</div>
            <PageCheck activePage={activePage} />
          </div>
        </div>

        <section className={styled.section}>
          <KakaoMap />
        </section>
      </div>
    </div>
  );
};
export default FastTheater;
