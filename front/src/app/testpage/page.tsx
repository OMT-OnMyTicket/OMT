'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styled from '../../styles/search_P_S/search.module.css';
const KMDB_KEY = process.env.NEXT_PUBLIC_KMDB_KEY;
const KMDB_URL = process.env.NEXT_PUBLIC_KMDB_URL;

type MovieData = {
  title: string;
  movieSeq: string;
  movieId: string;
};

type MovieState = {
  movieTitle: string[];
  movieSeq: string[];
  movieId: string[];
};

const initialState: MovieState = {
  movieTitle: [],
  movieSeq: [],
  movieId: []
};

export default function Page() {
  const [movieData, setMovieData] = useState<MovieState>(initialState);

  const handelDetail = (id: string) => {
    localStorage.setItem('MovieNum', id);
  };

  useEffect(() => {
    const storedSearchText = localStorage.getItem('검색어');

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
          movieTitle: results.map((result) =>
            result.title.replace(/!HS|!HE/g, '')
          ),
          movieId: results.map((result) => result.movieId),
          movieSeq: results.map((result) => result.movieSeq)
        };

        setMovieData(processedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className={styled.Seaarch_layout}>
      <div className={styled.Result_Layout}>
        {movieData.movieTitle.map((title, index) => {
          const splitTitle = title.split(':');
          const movieSeq = movieData.movieId[index] + movieData.movieSeq[index];
          return (
            <Link
              key={index}
              href={`/testpage/${movieSeq}`}
              onClick={() => handelDetail(movieSeq)}
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
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
