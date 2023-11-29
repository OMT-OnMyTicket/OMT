'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/_mainpage/header';
import styled from '@/styles/search_P_S/search.module.css';

const KMDB_KEY = process.env.NEXT_PUBLIC_KMDB_KEY;
const KMDB_URL = process.env.NEXT_PUBLIC_KMDB_URL;

type MovieData = {
  title: string;
  posters: string;
  genre: string;
  rating: string;
  runtime: string;
  movieSeq: string;
  repRatDate: string;
};

type MovieState = {
  moviePosters: string;
  movieTitle: string;
  rating: string;
  genre: string;
  runtime: string;
  movieSeq: string;
  repRatDate: string;
};

const initialState: MovieState = {
  moviePosters: '',
  movieTitle: '',
  rating: '',
  genre: '',
  runtime: '',
  movieSeq: '',
  repRatDate: ''
};
// export function generateStaticParams(slugs: string[]) {
//   return slugs.map((slug) => ({ slug }));
// }

const Detail = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [movieData, setMovieData] = useState<MovieState>(initialState);
  const [movieContents, setMovieContents] = useState<string[]>([]);
  const [directors, setDirectors] = useState<string[]>([]);
  const [actors, setAcrtors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${KMDB_URL}`, {
          params: {
            collection: 'kmdb_new2',
            detail: 'Y',
            movieId: slug.charAt(0),
            movieSeq: slug.substring(1),
            ServiceKey: KMDB_KEY
          }
        });

        const result: MovieData = response.data.Data[0]?.Result[0] || {};
        const contents = response.data.Data[0].Result[0].plots.plot[0].plotText;
        const movieDirectors =
          response.data.Data[0].Result[0].directors.director[0].directorNm;
        const movieActors = response.data.Data[0].Result[0].actors.actor
          .map((actor: any) => actor.actorNm)
          .join(', ');

        const processedData: MovieState = {
          moviePosters: result.posters?.split('|')[0] || '',
          movieTitle: result.title?.replace(/!HS|!HE/g, '') || '',
          movieSeq: result.movieSeq || '',
          rating: result.rating || '',
          genre: result.genre || '',
          runtime: result.runtime || '',
          repRatDate: result.repRatDate || ''
        };

        setAcrtors(movieActors);
        setDirectors(movieDirectors);
        setMovieData(processedData);
        setMovieContents(contents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, [slug]);

  const inputDate = movieData.repRatDate;
  let formattedDate = '';

  if (inputDate && inputDate.length === 8) {
    const year = inputDate.substring(0, 4);
    const month = inputDate.substring(4, 6);
    const day = inputDate.substring(6, 8);
    const dateObject = new Date(`${year}-${month}-${day}`);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    formattedDate = dateObject.toLocaleDateString('ko-KR', options);
  }

  let ratingImage = '';
  if (movieData.rating === '전체관람가') {
    ratingImage = '/png/전체이용가.png';
  } else if (movieData.rating === '18세관람가(청소년관람불가)') {
    ratingImage = '/png/청소년관람불가.png';
  } else if (movieData.rating === '15세관람가') {
    ratingImage = '/png/15세.png';
  } else if (movieData.rating === '12세관람가') {
    ratingImage = '/png/12세.png';
  }

  return (
    <>
      <nav>
        <Header />
      </nav>
      <div className={styled.Detail_Layout}>
        <h3 className={styled.MovieTitle}> {movieData.movieTitle}</h3>
        <div className={styled.Detail_Contents}>
          <img
            src={movieData.moviePosters || '/png/preparing.png'}
            alt={`${movieData.movieTitle} 포스터`}
            className={styled.Detail_Poster}
          />
          <div className={styled.Movie_box_Layout}>
            <div className={styled.Movie_box_Title}>영화 상세정보</div>
            <div className={styled.Movie_Contents}>
              <div className={styled.Movie_rating}>
                <img
                  src={ratingImage ? `${ratingImage}` : `${movieData.rating}`}
                  alt={movieData.rating}
                  className={styled.ratingImg}
                />
              </div>
              <p>{directors} 감독</p>
              <p>주연: {actors}</p>
              <p>개봉일: {formattedDate}</p>
              <p>장르: {movieData.genre}</p>
              <p>러닝타임: {movieData.runtime} 분</p>
            </div>
          </div>
          <div className={styled.Movie_box_Layout}>
            <div className={styled.Movie_box_Title}>영화 줄거리</div>
            <p className={styled.Movie_Plots}>{movieContents}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
