'use client';

import styled from '../../../styles/myticketP_S/ticketPage.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_URL;
const Ticket = () => {
  const [Title, setTitle] = useState<string | null>(null);
  const [movieid, setMovieId] = useState<string | null>(null);
  const [accessToken, setToken] = useState<string | null>(null);
  const [posterImageUrl, setPosterImageUrl] = useState<string>('');
  const [textValue, setTextValue] = useState('');
  const [userRating, setUserRating] = useState<number | null>(null);
  const router = useRouter();
  useEffect(() => {
    const storedTitle = localStorage.getItem('Ticket_Title');
    const storedPosterUrl = localStorage.getItem('posterUrl');
    const storedMovieId = localStorage.getItem('posterUrl');
    const storedToken: string | null = localStorage.getItem('Token');

    if (storedTitle) {
      setTitle(storedTitle);
    }
    if (storedPosterUrl) {
      setPosterImageUrl(storedPosterUrl);
    }
    if (storedMovieId) {
      setMovieId(storedMovieId);
    }
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
  };

  //   const handleLankStar = () => {
  //     axios
  //     .get(`${URL}/api/v1/users/movies`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     .then((res) => {
  //       alert('성공적으로 등록되었습니다.')
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   }

  return (
    <>
      <div className={styled.Layout}>
        <div className={styled.ticket_header}>
          <Link href={'/myticket/ticketroom'}>
            <img src='/back.svg' className={styled.back} />
          </Link>
          <div className={styled.Ticket_Tilte}>{Title}</div>
          <img src='/png/fill_star.png' className={styled.Lank_star} />
        </div>
        <div className={styled.Ticket_Layout}>
          <div className={styled.MovieTicket_Layout}>
            <img src='/png/Circle.png' className={styled.Circle} />
            <img src={posterImageUrl} className={styled.MovieTicket} />
          </div>

          <div className={styled.TextTicket_Layout}>
            <img src='/png/Circle.png' className={styled.Circle} />
            <img src={posterImageUrl} className={styled.TextTicket} />
            <div className={styled.Write_Layout}>
              <div className={styled.Togeter}>
                <div className={styled.Write_Title}>함께 본 사람</div>

                <div className={styled.TextArea_Layout}>
                  <textarea
                    placeholder='영화를 함께 본 사람을 입력해주세요.'
                    // value={textValue}
                    className={styled.Togeter_TextArea}
                  ></textarea>
                </div>
              </div>
              <div className={styled.MyRewiew}>
                <div className={styled.Write_Title}>나만의 리뷰</div>
                <div className={styled.TextArea_Layout}>
                  <textarea
                    placeholder='영화에 대한 나만의 리뷰를 남겨봐요.'
                    // value={textValue}
                    className={styled.Review_TextArea}
                  ></textarea>
                </div>
              </div>
              <div className={styled.MyScore}>
                <div className={styled.Write_Title}>나만의 평점</div>
                <div className={styled.StarRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img
                      key={star}
                      src={
                        userRating && star <= userRating
                          ? '/png/fill_star.png'
                          : '/png/empty_star.png'
                      }
                      className={styled.Star}
                      onClick={() => handleStarClick(star)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <img src='/png/글쓰기.png' className={styled.WriteHand} /> */}\
        <div className={styled.SaveTxt}>
          우측 저장하기를 누르면 내용이 저장됩니다.
        </div>
        <div className={styled.SaveBtn}>
          <p>저장하기</p>
        </div>
        <Link href={'/home'}>
          <div className={styled.goHome}>
            <p>Hoom</p>
          </div>
        </Link>
      </div>
    </>
  );
};
export default Ticket;
