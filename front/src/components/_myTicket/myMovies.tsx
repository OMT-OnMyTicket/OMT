'use client';
import Search from '@/components/_mainpage/search';
import styled from '../../styles/myticketP_S/ticketRoom.module.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../AuthContext';

const URL = process.env.NEXT_PUBLIC_URL;

const MyMovies = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { accessToken } = useAuth();
  const [watchedMovies, setWatchedMovies] = useState<any[] | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      axios
        .get(`${URL}/api/v1/users/movies`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          const watchedMoviesResponse = res.data.body.response;
          setWatchedMovies(watchedMoviesResponse);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [accessToken]);

  const handleEmptyTicketClick = () => {
    setShowSearch(true);
  };
  const handleCloseSearch = () => {
    setShowSearch(false);
  };

  const handleClickOutside = (event: any) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      handleCloseSearch();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleMakeTicket = (
    title: string,
    posterUrl: string,
    movieId: string
  ) => {
    localStorage.setItem('Ticket_Title', title);
    localStorage.setItem('posterUrl', posterUrl);
    localStorage.setItem('movieId', movieId);
    router.push('/myticket/ticket');
  };

  return (
    <>
      {watchedMovies && watchedMovies.length > 0 ? (
        <div className={styled.Movies_Layout}>
          {watchedMovies.map((movie, index) => (
            <div key={index} className={styled.Movies}>
              <img
                src={movie.posterImageUrl}
                alt='영화 포스터'
                className={styled.Posters}
                onClick={() => {
                  handleMakeTicket(
                    movie.title,
                    movie.posterImageUrl,
                    movie.movieId
                  );
                }}
              />
              <div className={styled.MovieTitle}>{movie.title.trim()}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styled.EmptyPage}>
          {showSearch ? (
            <div className={styled.Search}>
              <Search />
            </div>
          ) : (
            <div
              className={styled.emptyTicket}
              onClick={handleEmptyTicketClick}
            >
              <div className={styled.emptyTxt}>TicketRoom이 비어있습니다.</div>
              <div className={styled.empty_SubTxt}>
                위 메시지를 클릭하면 검색창이 나옵니다.
              </div>
              <div className={styled.empty_SubTxt}>
                영화를 검색하고 나만의 Ticket Room을 채워보세요.
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MyMovies;
