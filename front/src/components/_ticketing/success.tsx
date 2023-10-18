'use client';
import { useEffect, useState } from 'react';
import styled from '../../styles/ticketingP_S/success.module.css';
import Link from 'next/link';

const Success = () => {
  const [MovieTitle, setMovieTitle] = useState('');
  const [Users, setUsers] = useState('');
  const [ChoicedSeat, setChoicedSeat] = useState('');
  const [Theater, setTheater] = useState('');
  const [posterURL, setPosterURL] = useState('');
  const Charge = Number(Users) * 12000;

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
      setPosterURL(storedPoster);
    }
  }, []);

  const moviePoster1 = posterURL ? (
    <img src={posterURL} className={styled.Ticket_Box_Poster1} alt='포스터' />
  ) : null;
  const moviePoster2 = posterURL ? (
    <img src={posterURL} className={styled.Ticket_Box_Poster2} alt='포스터' />
  ) : null;
  return (
    <div className={styled.Container}>
      <div className={styled.Box}>
        <div className={styled.Box_Top}>
          <div className={styled.Success_Check}>
            <img src={'/check.svg'} />
          </div>
          <div className={styled.Success_ment1}>예매완료</div>
          {/* <div className={styled.Success_ment2}>즐거운 관람 되세요.</div> */}
        </div>
        <div className={styled.Box_Bottom}>
          <div className={styled.Tickets}>
            <div className={styled.Ticket1}>
              <div className={styled.Ticket1_Poster}>{moviePoster1}</div>
            </div>
            <div className={styled.Ticket2}>
              <div className={styled.Ticket2_Poster}>{moviePoster2}</div>
              <div className={styled.Info_Conetent}>
                <div className={styled.Original}>Original Ticket</div>
                <div className={styled.Ticket_Info}>
                  <div className={styled.Ticket_Info_Title}>
                    <div className={styled.Txt_Title}>Title :</div>
                    <div className={styled.Txt_Conetent_Title}>
                      {MovieTitle}
                    </div>
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
              </div>
            </div>
          </div>
          <div className={styled.Last_Check}>
            <div className={styled.Success_ment2}>즐거운 관람 되세요.</div>
            <div className={styled.LastCheck_Info}>
              <div className={styled.LastCheck_Info_ID}>
                <div className={styled.LastCheck_Title}>결제 ID</div>
                <div className={styled.LastCheck_Conetent_Title}>
                  {'김세훈'}
                </div>
              </div>
              <div className={styled.LastCheck_Info_Pay}>
                <div className={styled.LastCheck_Title}>결제수단 </div>
                <div className={styled.LastCheck_Conetent}>{'카카오페이'}</div>
              </div>
              <div className={styled.LastCheck_Info_Charge}>
                <div className={styled.LastCheck_Title}>결제금액 </div>
                <div className={styled.LastCheck_Conetent}>{Charge}원</div>
              </div>
            </div>
            <Link href='/home' className={styled.Btn_Layout}>
              <div className={styled.Btn}>확인</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
