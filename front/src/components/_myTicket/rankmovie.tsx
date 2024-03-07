import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from '../../styles/myticketP_S/myTicketHome.module.css';
import axios from 'axios';
import Link from 'next/link';
import { useAuth } from '../AuthContext';

const URL = process.env.NEXT_PUBLIC_URL;
const RankedMovie = () => {
  const router = useRouter();
  const [watchedMovies, setWatchedMovies] = useState<any[] | null>(null);
  const { accessToken } = useAuth();
  useEffect(() => {
    AOS.init();
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
          console.log(err);
          localStorage.clear();
          router.push('/');
        });
    }
  }, [accessToken]);

  return (
    <>
      {watchedMovies && watchedMovies.length > 0 ? (
        <div className={styled.Lank_Movie_Box}>
          {watchedMovies.slice(0, 2).map((movie, index) => (
            <div key={index} className={styled.MoviePosters}>
              <div
                className={styled.Img_Layout}
                data-aos='flip-left'
                data-aos-duration='1500'
              >
                <img
                  src={movie.posterImageUrl || '/png/preparing.png'}
                  alt='영화 포스터'
                  className={styled.MoviePoster}
                />
                <div className={styled.MovieLank}>{index + 1}</div>
                <div className={styled.MovieTitle}>
                  <p>{index + 1}위</p>
                  <p>{movie.title}</p>
                </div>
              </div>
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
