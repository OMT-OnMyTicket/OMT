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
  const [review, setReview] = useState<string>('');
  const [companion, setCompanion] = useState<string>('');
  const [userRating, setUserRating] = useState<number | null>(null);

  const router = useRouter();
  useEffect(() => {
    const storedTitle = localStorage.getItem('Ticket_Title');
    const storedPosterUrl = localStorage.getItem('posterUrl');
    const storedMovieId = localStorage.getItem('movieId');
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

  const UserReview = {
    movieid,
    companion,
    userRating,
    review
  };

  // 기본적으로 유저 리뷰를 띄우기 위한 Code
  useEffect(() => {
    axios
      .get(`${URL}/api/v1/movies/review`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  // 리뷰 저장하기 버튼을 통한 Code
  const handleSaveReview = () => {
    // axios
    //   .put(`${URL}/api/v1/movies/review`, UserReview, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    console.log(UserReview);
  };

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleCompanionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCompanion(event.target.value);
  };

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview(event.target.value);
  };

  return (
    <>
      <div className={styled.Layout}>
        <div className={styled.ticket_header}>
          <Link href={'/myticket/ticketroom'}>
            <img src='/back.svg' className={styled.back} />
          </Link>
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
            <div className={styled.Write_Layout}>
              <div className={styled.Togeter}>
                <div className={styled.Write_Title}>함께 본 사람</div>

                <div className={styled.TextArea_Layout}>
                  <textarea
                    placeholder='영화를 함께 본 사람을 입력해주세요.'
                    onChange={handleCompanionChange}
                    className={styled.Togeter_TextArea}
                  ></textarea>
                </div>
              </div>
              <div className={styled.MyRewiew}>
                <div className={styled.Write_Title}>나만의 리뷰</div>
                <div className={styled.TextArea_Layout}>
                  <textarea
                    placeholder='영화에 대한 나만의 리뷰를 남겨봐요.'
                    onChange={handleReviewChange}
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

        <div className={styled.SaveTxt}>
          우측 저장하기를 누르면 내용이 저장됩니다.
        </div>
        <div className={styled.SaveBtn} onClick={handleSaveReview}>
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
