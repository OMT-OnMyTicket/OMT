'use client';
import styled from '../../styles/search_P_S/checkList.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
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
  const [movieId, setMovieId] = useState<string | null>('');

  const router = useRouter();

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
            setWatchTxt('이미 관람한 영화입니다.');
            setMovieId(watchedMovies[0].movieId);
          } else {
            console.log('아직 시청하지 않은 영화입니다.');
          }
        })
        .catch((err) => {
          console.log('토큰이 만료되었습니다.');
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
      // If the movie has been watched, send a DELETE request
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
          window.location.reload();
        })
        .catch((error) => {
          console.error('Delete Error:', error);
        });
    } else {
      // If the movie has not been watched, send a POST request
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
          window.location.reload();
        })
        .catch((error) => {
          console.error('Create Error:', error);
        });
    }
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
