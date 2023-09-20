'use client';

import styled from '../../styles/ticketingP_S/pay.module.css';
import MovieTicket from '../Movieticket';
import InfoTicket from '../InfoTicket';

const Pay = () => {
  const MovieTitle = localStorage.getItem('영화');
  const Users = localStorage.getItem('인원수');
  const ChoicedSeat = localStorage.getItem('선택좌석');
  const Theater = localStorage.getItem('영화관');
  const Charge = Number(Users) * 12000;

  const handlePay = () => {
    window.location.href = 'http://localhost:3000/ticketing/pay/success';
  };

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
          <div className={styled.Payment_Title}>간편결제</div>
          <div className={styled.Charge}>{Charge} 원</div>
          <div className={styled.Payment_Way_Container}>
            <div className={styled.Payment_Way}>
              <img
                src={'/토스페이.png'}
                alt='토스페이'
                className={styled.Payment_Toss}
              />
              <img
                src={'/카카오페이.png'}
                alt='카카오페이'
                className={styled.Payment_KaKao}
              />
              <img
                src={'/네이버페이.png'}
                alt='네이버페이'
                className={styled.Payment_Naver}
              />
            </div>

            <img src={'/캐릭터.png'} className={styled.charactor} />
            <div>
              <div className={styled.Payment_Confirmation}>
                <div>약관동의</div>

                <div onClick={handlePay} className={styled.pay_Btn}>
                  결제하기
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
