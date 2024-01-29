'use client';

import styled from '../../../styles/myticketP_S/ticketPage.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_URL;
const Ticket = () => {
  const [Title, setTitle] = useState<string | null>(null);
  const [id, setMovieId] = useState<string | null>(null);
  const [accessToken, setToken] = useState<string | null>(null);
  const [posterImageUrl, setPosterImageUrl] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [companion, setCompanion] = useState<string>('');
  const [grade, setGrade] = useState<number | null>(null);

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
    id,
    companion,
    grade,
    review
  };

  // 기본적으로 유저 리뷰를 띄우기 위한 Code

  // useEffect(() => {
  //   axios
  //     .get(`${URL}/api/v1/movies/ticket`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [accessToken]);

  const handleSaveReview = () => {
    if (!companion || !review || !grade) {
      alert(
        `${!companion ? '함께 본 사람' : ''}` +
          `${!companion && !review ? ', ' : ''}` +
          `${!review ? '나만의 리뷰' : ''}` +
          `${(!companion || !review) && !grade ? ', ' : ''}` +
          `${!grade ? '나만의 평점' : ''}` +
          '을(를) 추가로 채워주세요!'
      );
      return;
    }

    axios
      .put(`${URL}/api/v1/movies/ticket`, UserReview, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        router.push('/myticket/ticketroom');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStarClick = (rating: number) => {
    setGrade(rating);
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
                        grade && star <= grade
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
