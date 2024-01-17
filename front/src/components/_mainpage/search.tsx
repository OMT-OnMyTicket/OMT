'use client';

import React, { useEffect, useState, useRef } from 'react';
import styled from '../../styles/search_P_S/searchComp.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const KMDB_KEY = process.env.NEXT_PUBLIC_KMDB_KEY;
const KMDB_URL = process.env.NEXT_PUBLIC_KMDB_URL;

const Search = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [movieTitle, setMovieTitle] = useState<string[]>([]);
  const textAreaRef = useRef<HTMLDivElement | null>(null);
  const [isTitleClicked, setIsTitleClicked] = useState(false); // 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${KMDB_URL}`, {
          params: {
            collection: 'kmdb_new2',
            detail: 'Y',
            title: inputText,
            ServiceKey: KMDB_KEY
          }
        });

        const results = response.data.Data[0]?.Result;
        if (results) {
          const titles = results.map((result: any) => {
            const processedTitle = result.title.replace(/!HS|!HE/g, '');
            return processedTitle;
          });
          setMovieTitle(titles);
        } else {
          // API 응답이 유효한 데이터를 반환하지 않는 경우에 대한 처리
          setMovieTitle([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // inputText가 변경될 때마다 API 호출
    if (inputText) {
      fetchData();
    } else {
      // inputText가 비어있을 때, 빈 배열로 초기화
      setMovieTitle([]);
    }

    const handleOutsideClick = (e: { target: any }) => {
      if (textAreaRef.current && !textAreaRef.current.contains(e.target)) {
        // 마우스 클릭 위치가 TextArea 외부인 경우 TextArea 비우기
        setIsTitleClicked(true);
      }
    };

    // 마운트 시 이벤트 리스너 추가
    document.addEventListener('mousedown', handleOutsideClick);

    // 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [inputText]);

  const handleClickSearch = (id: string) => {
    localStorage.clear;
    localStorage.setItem('검색어', id);
    router.push('/search');
  };

  return (
    <>
      <div ref={textAreaRef}>
        <li className={styled.search_width}>
          <textarea
            className={styled.Textarea}
            placeholder='영화를 검색해보세요.'
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setIsTitleClicked(false);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleClickSearch(inputText);
              }
            }}
          ></textarea>

          <img
            src='/search.svg'
            className={styled.search}
            onClick={() => handleClickSearch(inputText)}
          />
        </li>
        {inputText && !isTitleClicked && (
          <div className={styled.Testbox}>
            <ul className={styled.Search_ul}>
              {movieTitle.map((title, index) => (
                <li
                  key={index}
                  className={styled.movieTitle_search}
                  onClick={() => {
                    setInputText(title);
                    setIsTitleClicked(true);
                  }}
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
