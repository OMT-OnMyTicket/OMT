import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from '../../styles/myticketP_S/myTicketHome.module.css';
import axios from 'axios';
import Link from 'next/link';
const RankedMovie = () => {
  const [watchedMovies, setWatchedMovies] = useState<any[] | null>(null);
  const [accessToken, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedToken: string | null = localStorage.getItem('Token');
    AOS.init();

    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  useEffect(() => {
    if (accessToken !== null) {
      axios
        .get(`${URL}/api/v1/users/movies/top4`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          const watchedMovies = res.data.body.response;
          setWatchedMovies(watchedMovies);
        })
        .catch((err) => {
          console.log('토큰이 만료되었습니다.');
        });
    }
  }, [accessToken]);

  return (
    <>
      {watchedMovies && watchedMovies.length > 0 ? (
        <div className={styled.Lank_Movie_Box}>
          {watchedMovies.slice(0, 2).map((movie, index) => (
            <div key={index} className={styled.MoviePosters}>
              <img
                src={movie.posterImageUrl}
                alt='영화 포스터'
                className={styled.MoviePoster}
                data-aos='flip-left'
                data-aos-duration='1500'
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styled.EmptyMovie}>
          <Link href={'/myticket/ticketroom'}>
            <div className={styled.EmptyMovie_Txt}>
              랭크 된 영화가 없습니다.
              <p className={styled.EmptyMovie_SubTxt}>
                해당 메시지를 클릭하면 <br />
                My Ticket Room으로 이동합니다.
              </p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};
export default RankedMovie;
