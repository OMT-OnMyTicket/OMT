import styled from '../../styles/ticket.module.css';
import React from 'react';
interface MovieTicketProps {
  posterURL: string;
  showCircles: boolean;
}

const PayMovieTicket: React.FC<MovieTicketProps> = ({
  posterURL,
  showCircles
}) => {
  return (
    <div className={styled.Ticket_Box_MovieInfo}>
      <img src={posterURL} className={styled.Ticket_Box_Poster} />
      {showCircles && (
        <>
          <div className={styled.Circle_Line_T}>
            {[...Array(6)].map((_, index) => (
              <div className={styled.Circle_T} key={index}></div>
            ))}
          </div>
          <div className={styled.Circle_Line_B}>
            {[...Array(6)].map((_, index) => (
              <div className={styled.Circle_B} key={index}></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PayMovieTicket;
