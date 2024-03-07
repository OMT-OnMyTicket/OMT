'use client';
import styled from '../../styles/search_P_S/checkList.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../AuthContext';

const URL = process.env.NEXT_PUBLIC_URL;
// axios.defaults.withCredentials = true;
const Check = () => {
  const { accessToken, setAccessToken } = useAuth();
  const [Title, setTitle] = useState<string | null>(null);
  const [posterImageUrl, setPosterImageUrl] = useState<string | null>(null);
  const [Genre, setGenre] = useState<string | null>(null);
  const [hasWatched, setHasWatched] = useState<boolean>(false);
  const [watchTxt, setWatchTxt] = useState<string | null>(
    '아직 관람하지 않은 영화입니다.'
  );
  const [movieId, setMovieId] = useState<string | null>('');

  const router = useRouter();

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
    if (storedGenre) {
      setGenre(storedGenre);
    }
  }, []);

  useEffect(() => {
    console.log(accessToken);
    if (accessToken !== null) {
      axios
        .get(`${URL}/api/v1/users/movies`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          const watchedMovies = res.data.body.response;
          const hasWatched = watchedMovies.some(
            (movie: any) => movie.title === Title
          );
          if (hasWatched) {
            setHasWatched(hasWatched);
            setWatchTxt('이 영화 봤어요 !');
            setMovieId(watchedMovies[0].movieId);
          } else {
            console.log('아직 시청하지 않은 영화예요 !');
            setHasWatched(false);
            setWatchTxt('아직 관람하지 않은 영화입니다.');
          }
        })
        .catch((error) => {
          // if (error.response.status == 401) {
          //   console.log(error.response.status, '이미 만료된 토큰입니다.');
          //   axios
          //     .get(`${URL}/api/all/v1/auth/refresh`, {
          //       headers: {
          //         Authorization: `Bearer ${accessToken}`,
          //         'Content-Type': 'application/json'
          //       }
          //     })
          //     .then((res) => {
          //       if (res.data.header.code === 500) {
          //         console.log('500 토큰갱신에 실패했습니다.');
          //       } else if (res.data.header.code === 200) {
          //         // const newAccessToken = res.data
          //         // setAccessToken(newAccessToken)
          //         console.log('토큰갱신에 성공했습니다.');
          //         console.log(res);
          //       }
          //     })
          //     .catch((err) => {
          //       console.error('토큰갱신에 실패했습니다.');
          //       // localStorage.clear();
          //       // router.push('/home');
          //       // alert('재 로그인이 필요합니다.');
          //     });
          // }
          if (error.response.status == 401) {
            console.log('401 get: 이미 만료된 토큰입니다.');
          } else {
            console.error(error);
          }
        });
    }
  }, [accessToken, Title]);

  const handleCheckMovie = () => {
    const movieData = {
      title: Title,
      posterImageUrl: posterImageUrl,
      genre: Genre
    };

    if (hasWatched) {
      axios
        .delete(`${URL}/api/v1/movies?movieId=${movieId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('Delete Success:', response);
          setHasWatched(false); // to empty the checkbox
          // window.location.reload();
        })
        .catch((error) => {
          console.error('Delete Error:', error);
        });
    } else {
      axios
        .post(`${URL}/api/v1/movies`, movieData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('Create Success:', response);
          setHasWatched(true);
          setMovieId(response.data.body.movieId);
          // window.location.reload();
        })
        .catch((error) => {
          if (error.response.status == 401) {
            console.log(error.response.status, 'Post: 이미 만료된 토큰입니다.');

            axios
              .get(`${URL}/api/all/v1/auth/refresh`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
                },
                withCredentials: true
              })
              .then((res) => {
                if (res.data.header.code === 500) {
                  console.log(res);
                  console.log(res.data.header.message);
                } else if (res.data.header.code === 200) {
                  // const newAccessToken = res.data
                  // setAccessToken(newAccessToken)
                  console.log('토큰갱신에 성공했습니다.');
                  console.log(res);
                }
              })
              .catch((err) => {
                console.error('토큰갱신에 실패했습니다.');
                console.log(err);
                // localStorage.clear();
                // router.push('/home');
                // alert('재 로그인이 필요합니다.');
              });
          }
        });
    }
  };

  return (
    <div className={styled.CheckList}>
      <img
        src={hasWatched ? '/checkbox.svg' : '/emptybox.svg'}
        className={styled.CkeckBox}
        onClick={handleCheckMovie}
      />

      <div className={styled.CheckTxt}>{watchTxt}</div>
    </div>
  );
};

export default Check;
