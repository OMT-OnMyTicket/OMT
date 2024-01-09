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
        <img src={'/png/Circle.png'} className={styled.Ticket_Circle} />
      )}
    </div>
  );
};

export default PayMovieTicket;
