'use client';

import styled from '../../styles/ticketingP_S/pay.module.css';

const Pay = () => {
  const MovieTitle = localStorage.getItem('영화');
  const Users = localStorage.getItem('인원수');
  const ChoicedSeat = localStorage.getItem('선택좌석');
  const Theater = localStorage.getItem('영화관');
  const Charge = Number(Users) * 12000;

  return (
    <div className={styled.Container}>
      <div className={styled.Boxes}>
        <img src={'/ticket.png'} className={styled.Ticket} />
        <div className={styled.Ticket_Box}>
          <div className={styled.Ticket_Box_MovieInfo}>
            <img
              src={localStorage.포스터URL}
              className={styled.Ticket_Box_Poster}
            />
            <div className={styled.Ticket_Box_MovieTitle}>{MovieTitle}</div>
          </div>
          <div className={styled.Ticket_Box_UserInfo}>
            <div>00:00시</div>
            <div>{ChoicedSeat}</div>
          </div>
        </div>

        {/* 결제하기 BOX */}

        <div className={styled.Pay_Box}>
          <div className={styled.Pay_Check}>
            <div className={styled.Charge}>{Charge} 원</div>
            <div className={styled.Pay_Recheck}>
              <div> {MovieTitle}</div>
              <div>00:00시</div>
              <div>성인 {Users}명</div>
              <div>선택좌석 : {ChoicedSeat}</div>
            </div>
          </div>

          <div className={styled.Payment}>
            <div className={styled.Payment_Title}>간편결제</div>
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
              <div>간편결제</div>
            </div>
          </div>
          <div className={styled.Payment_Confirmation}>
            <div>약관동의</div>
            <div>결제하기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
