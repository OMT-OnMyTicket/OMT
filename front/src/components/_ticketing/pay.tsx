'use client';

import styled from '../../styles/ticketingP_S/pay.module.css';
import MovieTicket from '../Movieticket';
import InfoTicket from '../InfoTicket';
import Payment from './payment';
import PageCheck from '../pageCheck';

const Pay = () => {
  const activepage = 4;
  const MovieTitle = localStorage.getItem('영화');
  const Users = localStorage.getItem('인원수');
  const ChoicedSeat = localStorage.getItem('선택좌석');
  const Theater = localStorage.getItem('장소');
  // const Charge = Number(Users) * 12000;

  return (
    <div className={styled.Container}>
      <div className={styled.Top}>
        <div className={styled.Pay_Coment}>결제하기</div>
        <div>
          <PageCheck activePage={activepage} />
        </div>
      </div>
      <div className={styled.Boxes}>
        <div className={styled.Ticket_Container}>
          <MovieTicket posterURL={localStorage.포스터URL} showCircles={true} />
          <InfoTicket
            MovieTitle={MovieTitle}
            Theater={Theater}
            Users={Users}
            ChoicedSeat={ChoicedSeat}
            posterURL={localStorage.포스터URL}
            showCircles={true}
          />
        </div>

        <div className={styled.Payment}>
          <div className={styled.Payment_Title}>결제 금액</div>
          <Payment />
        </div>
      </div>
    </div>
  );
};

export default Pay;
