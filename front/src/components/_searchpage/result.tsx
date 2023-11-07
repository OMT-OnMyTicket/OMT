'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
const KEY = process.env.NEXT_PUBLIC_KOPIC_KEY;
const URL = process.env.NEXT_PUBLIC_KOPIC_URL;
const KMDB_KEY = process.env.NEXT_PUBLIC_KMDB_KEY;
const KMDB_URL = process.env.NEXT_PUBLIC_KMDB_URL;

import styled from '../../styles/search_P_S/search.module.css';

type MovieData = {
  title: string;
  posters: string;
  genre: string;
  rating: string;
  runtime: string;
  movieSeq: string;
  movieId: string;
};

type MovieState = {
  moviePosters: string[];
  movieTitle: string[];
  rating: string[];
  genre: string[];
  runtime: string[];
  movieSeq: string[];
  movieId: string[];
};

const initialState: MovieState = {
  moviePosters: [],
  movieTitle: [],
  rating: [],
  genre: [],
  runtime: [],
  movieSeq: [],
  movieId: []
};

const Result = () => {
  const [movieData, setMovieData] = useState<MovieState>(initialState);
  const [SearchText, setSearchText] = useState('');
  useEffect(() => {
    const storedSearchText = localStorage.getItem('검색어');
    if (storedSearchText) {
      setSearchText(storedSearchText);
      axios
        .get(`${KMDB_URL}`, {
          params: {
            collection: 'kmdb_new2',
            detail: 'Y',
            title: storedSearchText,
            ServiceKey: KMDB_KEY
          }
        })
        .then((res) => {
          const results: MovieData[] = res.data.Data[0]?.Result || [];

          const processedData: MovieState = {
            moviePosters: results.map((result) => result.posters.split('|')[0]),
            movieTitle: results.map((result) =>
              result.title.replace(/!HS|!HE/g, '')
            ),
            movieId: results.map((result) => result.movieId),
            movieSeq: results.map((result) => result.movieSeq),
            rating: results.map((result) => result.rating),
            genre: results.map((result) => result.genre),
            runtime: results.map((result) => result.runtime)
          };

          setMovieData(processedData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);

  return (
    <div className={styled.Seaarch_layout}>
      <div className={styled.Search_Result}>
        <p className={styled.Search_Text}>"{SearchText}"</p>
        <p className={styled.Search_subTxt}>
          로 검색한 결과 ({movieData.movieTitle.length}개)
        </p>
      </div>

      <div className={styled.Result_Layout}>
        {movieData.movieTitle.map((title, index) => {
          const splitTitle = title.split(':');
          const movieSeq = movieData.movieId[index] + movieData.movieSeq[index];
          return (
            <Link
              key={index}
              href={{
                pathname: '/search/[slug]',
                query: {
                  slug: `${movieSeq}`,
                  title: 'detailPage'
                }
              }}
              as={`/search/${movieSeq}`}
            >
              <div key={index} className={styled.Result}>
                <h3 className={styled.Result_Title}>
                  {splitTitle.length > 1 ? (
                    <>
                      {splitTitle[0]}: <br /> {splitTitle[1]}
                    </>
                  ) : (
                    title
                  )}
                </h3>
                <div className={styled.Result_Poster_Layout}>
                  <img
                    src={movieData.moviePosters[index] || '/png/preparing.png'}
                    alt={`${title} 포스터`}
                    className={styled.Result_Poster}
                  />
                </div>
                <p>{movieData.rating[index]}</p>
                <p>장르: {movieData.genre[index]}</p>
                <p>러닝타임: {movieData.runtime[index]} 분</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Result;
