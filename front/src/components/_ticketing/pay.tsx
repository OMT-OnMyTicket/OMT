'use client';

import styled from '../../styles/ticketingP_S/pay.module.css';
import MovieTicket from '../Movieticket';
import InfoTicket from '../InfoTicket';
import Payment from './payment';

const Pay = () => {
  const MovieTitle = localStorage.getItem('영화');
  const Users = localStorage.getItem('인원수');
  const ChoicedSeat = localStorage.getItem('선택좌석');
  const Theater = localStorage.getItem('영화관');
  // const Charge = Number(Users) * 12000;

  return (
    <div className={styled.Container}>
      <div className={styled.Pay_Coment}>
        영화 관람의 <br /> 마지막 단계
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
