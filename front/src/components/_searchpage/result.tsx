'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const KEY = process.env.NEXT_PUBLIC_KOPIC_KEY;
const URL = process.env.NEXT_PUBLIC_KOPIC_URL;
const KMDB_KEY = process.env.NEXT_PUBLIC_KMDB_KEY;
const KMDB_URL = process.env.NEXT_PUBLIC_KMDB_URL;
const SearchText = localStorage.getItem('검색어');
import styled from '../../styles/search_P_S/search.module.css';

type MovieData = {
  title: string;
  posters: string;
  plots: { plotText: string }[];
  genre: string; // 변경: 문자열 배열로 선언
  rating: string;
  keywords: string;
  runtime: string;
};

type MovieState = {
  moviePosters: string[];
  movieTitle: string[];
  rating: string[];
  genre: string[]; // 배열로 선언
  movieContents: string[];
  keword: string[];
  runtime: string[];
};

const initialState: MovieState = {
  moviePosters: [],
  movieTitle: [],
  rating: [],
  genre: [], // 배열로 선언
  movieContents: [],
  keword: [],
  runtime: []
};

const Result = () => {
  const [movieData, setMovieData] = useState<MovieState>(initialState);

  useEffect(() => {
    axios
      .get(`${KMDB_URL}`, {
        params: {
          collection: 'kmdb_new2',
          detail: 'Y',
          title: SearchText,
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
          rating: results.map((result) => result.rating),
          genre: results.map((result) => result.genre),
          movieContents: results.map(
            (result) => result.plots[0]?.plotText || ''
          ),
          keword: results.map((result) => result.keywords),
          runtime: results.map((result) => result.runtime)
        };

        setMovieData(processedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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
          // ":" 이 있는 경우 ":"을 기준으로 문자열을 나누고 줄바꿈을 추가
          const splitTitle = title.split(':');
          return (
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
              <p>줄거리: {movieData.movieContents[index]}</p>
              <p>키워드: {movieData.keword[index]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Result;
