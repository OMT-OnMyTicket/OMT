// InfoTicket.tsx
import React from 'react';
import styled from '../../../styles/ticketingP_S/map.module.css';

interface InfoTicketProps {
  MovieTitle: string | null;
  Users: string | null;
  posterURL: string;
  showCircles: boolean; // 새로운 prop 추가
}

const FastTicket: React.FC<InfoTicketProps> = ({
  MovieTitle,
  Users,
  posterURL,
  showCircles // 새로운 prop 사용
}) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={styled.Ticket_Box_MovieInfo2}>
      <div className={styled.Ticket_Info}>
        <div className={styled.Ticket_Info_Title}>
          <div className={styled.Txt_Title}>Title :</div>
          <div className={styled.Txt_Conetent_Title}>{MovieTitle}</div>
        </div>
        <div className={styled.Ticket_Info_Release}>
          <div className={styled.Txt_Title}>Release :</div>
          <div className={styled.Txt_Conetent}>{getCurrentDate()}</div>
          <div className={styled.Txt_Conetent}>가까운 시간대</div>
        </div>
        <div className={styled.Ticket_Info_Seat}>
          <div className={styled.Txt_Title}>Seat :</div>
          <div className={styled.Txt_Conetent}>성인 {Users}명</div>
          <div className={styled.Txt_Conetent}>좌석 자동선택</div>
        </div>
      </div>

      <img src={posterURL} className={styled.Ticket_Box_Poster2} />

      {showCircles && (
        <img src={'/png/Circle.png'} className={styled.Ticket_Circle} />
      )}
    </div>
  );
};

export default FastTicket;
