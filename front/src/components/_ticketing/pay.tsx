'use client';

import styled from '../../styles/ticketingP_S/pay.module.css';
import MovieTicket from '../movieticket';
import InfoTicket from '../infoTicket';
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
  const [Date, setDate] = useState('');
  const [Time, setTime] = useState('');

  useEffect(() => {
    const storedMovieTitle = localStorage.getItem('영화');
    const storedUsers = localStorage.getItem('인원수');
    const storedChoicedSeat = localStorage.getItem('선택좌석');
    const storedTheater = localStorage.getItem('장소');
    const storedPoster = localStorage.getItem('포스터URL');
    const storedDate = localStorage.getItem('예매날짜');
    const storedInformation = localStorage.getItem('예매정보');
    const storedTime = storedInformation
      ? JSON.parse(storedInformation).time
      : null;

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
    if (storedDate) {
      setDate(storedDate);
    }
    if (storedPoster) {
      setPoster(storedPoster);
    }
    if (storedTime) {
      setTime(storedTime);
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
            Date={Date}
            Time={Time}
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
