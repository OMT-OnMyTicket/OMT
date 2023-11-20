'use client';

import styled from '../../styles/ticketingP_S/pay.module.css';
import MovieTicket from '../Movieticket';
import InfoTicket from '../InfoTicket';
import Payment from './payment';
import PageCheck from '../pageCheck';
import { useEffect, useState } from 'react';

const Pay = () => {
  const activepage = 4;
  const [MovieTitle, setMovieTitle] = useState('');
  const [Users, setUsers] = useState('');
  const [ChoicedSeat, setChoicedSeat] = useState('');
  const [Theater, setTheater] = useState('');
  const [Poster, setPoster] = useState('');

  useEffect(() => {
    const storedMovieTitle = localStorage.getItem('영화');
    const storedUsers = localStorage.getItem('인원수');
    const storedChoicedSeat = localStorage.getItem('선택좌석');
    const storedTheater = localStorage.getItem('장소');
    const storedPoster = localStorage.getItem('포스터URL');

    if (storedMovieTitle) {
      setMovieTitle(storedMovieTitle);
    }

    if (storedUsers) {
      setUsers(storedUsers);
    }

    if (storedChoicedSeat) {
      setChoicedSeat(storedChoicedSeat);
    }

    if (storedTheater) {
      setTheater(storedTheater);
    }

    if (storedPoster) {
      setPoster(storedPoster);
    }
  }, []);

  return (
    <div className={styled.Container}>
      <div className={styled.Top}>
        <div className={styled.Pay_Coment}>결제하기</div>
        <div>
          <PageCheck activePage={activepage} />
        </div>
      </div>
      <div className={styled.Boxes}>
        <div className={styled.Ticket_Container}>
          <MovieTicket posterURL={Poster} showCircles={true} />
          <InfoTicket
            MovieTitle={MovieTitle}
            Theater={Theater}
            Users={Users}
            ChoicedSeat={ChoicedSeat}
            posterURL={Poster}
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
