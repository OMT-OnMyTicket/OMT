// InfoTicket.tsx
import React from 'react';
import styled from '../styles/ticket.module.css';

interface InfoTicketProps {
  MovieTitle: string | null;
  Theater: string | null;
  Users: string | null;
  ChoicedSeat: string | null;
  posterURL: string;
  showCircles: boolean; // 새로운 prop 추가
}

const InfoTicket: React.FC<InfoTicketProps> = ({
  MovieTitle,
  Theater,
  Users,
  ChoicedSeat,
  posterURL,
  showCircles // 새로운 prop 사용
}) => {
  return (
    <div className={styled.Ticket_Box_MovieInfo2}>
      <div className={styled.Original}>Original Ticket</div>
      <div className={styled.Ticket_Info}>
        <div className={styled.Ticket_Info_Title}>
          <div className={styled.Txt_Title}>Title :</div>
          <div className={styled.Txt_Conetent_Title}>{MovieTitle}</div>
        </div>
        <div className={styled.Ticket_Info_Release}>
          <div className={styled.Txt_Title}>Release :</div>
          <div className={styled.Txt_Conetent}>{Theater}</div>
          <div className={styled.Txt_Conetent}>00시 00분</div>
        </div>
        <div className={styled.Ticket_Info_Seat}>
          <div className={styled.Txt_Title}>Seat :</div>
          <div className={styled.Txt_Conetent}>성인 {Users}명</div>
          <div className={styled.Txt_Conetent}>{ChoicedSeat}</div>
        </div>
      </div>
      <div className={styled.OMT}>OMT</div>
      <img src={posterURL} className={styled.Ticket_Box_Poster2} />

      {showCircles && (
        <>
          <div className={styled.Circle_Line_T2}>
            {[...Array(6)].map((_, index) => (
              <div className={styled.Circle_T2} key={index}></div>
            ))}
          </div>
          <div className={styled.Circle_Line_B2}>
            {[...Array(6)].map((_, index) => (
              <div className={styled.Circle_B2} key={index}></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InfoTicket;
