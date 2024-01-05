'use client';

import styled from '../../../styles/myticketP_S/ticketPage.module.css';
import React, { useEffect, useState } from 'react';
const Ticket = () => {
  const [Title, setTitle] = useState<string | null>(null);
  const [posterImageUrl, setPosterImageUrl] = useState<string>('');
  useEffect(() => {
    const storedTitle = localStorage.getItem('영화제목');
    const storedPosterUrl = localStorage.getItem('posterUrl');
    const storedGenre = localStorage.getItem('장르');

    if (storedTitle) {
      setTitle(storedTitle);
    }
    if (storedPosterUrl) {
      setPosterImageUrl(storedPosterUrl);
    }
  }, []);

  return (
    <>
      <div className={styled.Layout}>
        <div className={styled.ticket_header}>
          <img src='/back.svg' className={styled.back} />
          <div className={styled.Ticket_Tilte}>{Title}</div>
        </div>

        <div className={styled.Ticket_Layout}>
          <div className={styled.MovieTicket_Layout}>
            <img src='/png/Circle.png' className={styled.Circle} />
            <img src={posterImageUrl} className={styled.MovieTicket} />
          </div>

          <div className={styled.TextTicket_Layout}>
            <img src='/png/Circle.png' className={styled.Circle} />
            <img src={posterImageUrl} className={styled.TextTicket} />
          </div>
        </div>

        <img src='/png/글쓰기.png' className={styled.WriteHand} />
      </div>
    </>
  );
};
export default Ticket;
