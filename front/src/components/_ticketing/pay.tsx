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
        <div className={styled.Ticket_Box}>
          <div className={styled.Ticket_Box_Title}>티켓확인</div>
          <div className={styled.Ticket_Box_MovieInfo}>
            <div className={styled.Ticket_Box_Poster}>영화 포스터</div>
            <div className={styled.Ticket_Box_MovieTitle}>{MovieTitle}</div>
          </div>
          <div className={styled.Ticket_Box_UserInfo}>
            <div>극장: {Theater}</div>
            <div>선택시간: 00:00시</div>
            <div>인원수:{Users}명 </div>
            <div>선택좌석: {ChoicedSeat}</div>
          </div>
        </div>
        <div className={styled.Pay_Box}>
          <div>결제하기</div>
          <div className={styled.Pay_Check}>
            <div className={styled.Pay_Recheck}>
              <div> {MovieTitle}</div>
              <div>00:00시</div>
              <div>성인 {Users}명</div>
            </div>
            <div>금액 : {Charge} 원</div>
          </div>
          <div className={styled.Payment}>
            <div>간편결제</div>
            <div className={styled.Payment_Way}>
              <div className={styled.Payment_Toss}>토스페이로 결제하기</div>
              <div className={styled.Payment_KaKao}>카카오페이로 결제하기</div>
              <div className={styled.Payment_Naver}>네이버페이로 결제하기</div>
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
