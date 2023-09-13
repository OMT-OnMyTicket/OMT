import styled from '../../styles/ticketingP_S/pay.module.css';

const Pay = () => {
  return (
    <div className={styled.Container}>
      <div className={styled.Boxes}>
        <div className={styled.Ticket_Box}>
          <div className={styled.Ticket_Box_Title}>티켓확인</div>
          <div className={styled.Ticket_Box_MovieInfo}>
            <div className={styled.Ticket_Box_Poster}>영화 포스터</div>
            <div className={styled.Ticket_Box_MovieTitle}>영화 제목</div>
          </div>
          <div className={styled.Ticket_Box_UserInfo}>
            <div>극장: </div>
            <div>인원수: 명 </div>
            <div>선택좌석: </div>
          </div>
        </div>
        <div className={styled.Pay_Box}>결제하기</div>
      </div>
    </div>
  );
};

export default Pay;
