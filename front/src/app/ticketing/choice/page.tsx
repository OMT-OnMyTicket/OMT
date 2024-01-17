'use client';

import Header from '@/components/_loginpage/header';
import ChoiceMovie from '@/components/_ticketing/choice';
import styled from '../../../styles/ticketingP_S/page/ticketing.module.css';
import React, { useEffect, useState } from 'react';
import PageCheck from '@/components/pageCheck';

const Choice = () => {
  const [TicketingWay, setTicketingWay] = useState<string | null>(null);
  const activePage = 2;
  useEffect(() => {
    const storedTicketWay = localStorage.getItem('예매방법');
    if (storedTicketWay) {
      setTicketingWay(storedTicketWay);
    }
  }, []);

  return (
    <>
      <nav>
        <Header />
      </nav>
      <div className={styled.Container}>
        <div className={styled.Choice_Txts}>
          <div className={styled.Choice_Title}>{TicketingWay}</div>
          <div className={styled.PageCheck_Layout}>
            <div className={styled.Choice_Txt}>영화 선택하기</div>
            <PageCheck activePage={activePage} />
          </div>
        </div>
        <section>
          <ChoiceMovie />
        </section>
      </div>
    </>
  );
};
export default Choice;
