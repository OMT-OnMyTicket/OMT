'use client';
import styled from '../../styles/search_P_S/checkList.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_URL;

const Check = () => {
  const [accessToken, setToken] = useState<string | null>(null);
  const [Title, setTitle] = useState<string | null>(null);
  const [posterImageUrl, setPosterImageUrl] = useState<string | null>(null);
  const [Genre, setGenre] = useState<string | null>(null);
  const [hasWatched, setHasWatched] = useState<boolean>(false);
  const [watchTxt, setWatchTxt] = useState<string | null>(
    '아직 관람하지 않은 영화입니다.'
  );

  useEffect(() => {
    const storedTitle = localStorage.getItem('영화제목');
    const storedPosterUrl = localStorage.getItem('posterUrl');
    const storedGenre = localStorage.getItem('장르');
    const storedToken: string | null = localStorage.getItem('Token');

    if (storedTitle) {
      setTitle(storedTitle);
    }
    if (storedPosterUrl) {
      setPosterImageUrl(storedPosterUrl);
    }
    if (storedGenre) {
      setGenre(storedGenre);
    }
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);
  useEffect(() => {
    axios
      .get(`${URL}/api/v1/users/movies`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res);
        //   const watchedMoviesResponse = res.data.body.response;
        //   setWatchedMovies(watchedMoviesResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  // useEffect(() => {
  //   if (accessToken !== null) {
  //     axios
  //       .get(`${URL}/api/v1/users/movies`, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           'Content-Type': 'application/json'
  //         }
  //       })
  //       .then((res) => {
  //         const WatchedMovies = res.data.body.response;
  //         const hasWatched = WatchedMovies.some(
  //           (movie: any) => movie.title === Title
  //         );
  //         if (hasWatched) {
  //           setHasWatched(hasWatched);
  //           setWatchTxt('이미 관람한 영화입니다.');
  //         } else {
  //           console.log('아직 시청하지 않은 영화입니다.');
  //         }
  //       })
  //       .catch((err) => {
  //         console.log('토큰이 만료되었습니다.');
  //       });
  //   }
  // }, [accessToken, Title]);

  const handleCheckMovie = () => {
    const movieData = {
      title: Title,
      posterImageUrl: posterImageUrl,
      genre: Genre
    };

    axios
      .post(`${URL}/api/v1/movies`, movieData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Success:', response);
        setHasWatched(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className={styled.CheckList}>
      <input
        type='checkbox'
        checked={hasWatched}
        readOnly
        onClick={handleCheckMovie}
      ></input>
      <div>{watchTxt}</div>
    </div>
  );
};

export default Check;
