'use client';

import React, { useState } from 'react';
import styled from '../../styles/ticketingP_S/select.module.css';
import PageCheck from '../pageCheck';
import Select_Sit from './select_sit';
import Date from './date';
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_URL;

const SelectTheater = () => {
  const [count, setcount] = useState(1);
  const [selectPage, setSelectPage] = useState(1);
  const [theaters, setTheaters] = useState(['지역을 선택해주세요']);
  const activePage = 3;
  const cinema = localStorage.getItem('영화관');

  const handlePlusBtn = () => {
    if (count < 10) {
      setcount(count + 1);
    } else {
      alert('10명 이상으로는 예매할 수 없습니다.');
    }
  };

  const handleMinusBtn = () => {
    if (count > 1) {
      setcount(count - 1);
    } else {
      alert('최소 1명이상 예매가 가능합니다.');
    }
  };

  // 다음단계 버튼
  const handleNextBtn = (id: any) => {
    if (selectPage < 3) {
      setSelectPage(selectPage + 1);
    }
    if (selectPage === 2) {
      localStorage.setItem('인원수', id);
      console.log(id);
    }
  };

  // 이전단계 버튼
  const handlePrevBtn = () => {
    if (selectPage > 1) {
      setSelectPage(selectPage - 1);
    }
  };

  const choicedTheater = () => {
    if (localStorage.getItem('영화관') === 'CGV') {
      return (
        <div
          className={styled.choicedTheater}
          style={{
            backgroundImage: `url('/png/CGV_세로.png')`
          }}
        >
          <img src='/png/CGV.png' className={styled.choicedTheater_Logo} />
        </div>
      );
    } else if (localStorage.getItem('영화관') === '메가박스') {
      return (
        <div
          className={styled.choicedTheater}
          style={{
            backgroundImage: `url('/png/메가박스_세로.png')`
          }}
        >
          <img src='/png/메가박스.png' className={styled.choicedTheater_Logo} />
        </div>
      );
    } else if (localStorage.getItem('영화관') === '롯데시네마') {
      return (
        <div
          className={styled.choicedTheater}
          style={{
            backgroundImage: `url('/png/롯데시네마_세로.png')`
          }}
        >
          <img
            src='/png/롯데시네마.png'
            className={styled.choicedTheater_Logo}
          />
        </div>
      );
    } else if (localStorage.getItem('영화관') === '씨네큐') {
      return (
        <div
          className={styled.choicedTheater}
          style={{
            backgroundImage: `url('/png/씨네큐_세로.png')`
          }}
        >
          <img src='/png/씨네큐.png' className={styled.choicedTheater_Logo} />
        </div>
      );
    }
  };

  const handleRegion = (region: string) => {
    axios
      .get(`${URL}/api/v1/theaters/region/cinema`, {
        params: {
          region,
          cinema: cinema
        }
      })
      .then((res) => {
        const theaters = res.data.body.theaters;
        const cinemaNames = theaters.map((theater: any) => theater.cinemaName);

        setTheaters(cinemaNames);
      })
      .catch((err) => console.log(err));
  };
  const handleCinema = (id: string) => {
    localStorage.setItem('장소', id);
  };

  return (
    <>
      <div className={styled.Container}>
        <div className={styled.Select_Txts}>
          <div className={styled.Select_Title}>직접예매</div>
          <div className={styled.PageCheck_Layout}>
            <div className={styled.Select_Txt}>극장 선택하기</div>
            <PageCheck activePage={activePage} />
          </div>
        </div>
        <div className={styled.Select_Layout}>
          <div className={styled.Selcet_Container}>
            {selectPage === 1 && (
              <div className={styled.Select_1}>
                <div className={styled.Select_Local}>
                  지역
                  <div
                    onClick={() => handleRegion('서울')}
                    className={styled.Legion}
                  >
                    서울
                  </div>
                  <div
                    onClick={() => handleRegion('경기,인천')}
                    className={styled.Legion}
                  >
                    경기/인천
                  </div>
                  <div
                    onClick={() => handleRegion('강원')}
                    className={styled.Legion}
                  >
                    강원
                  </div>
                </div>

                <div className={styled.Select_Theater}>
                  지역별 영화관
                  <div className={styled.Theaters}>
                    {theaters.map((cinemaName, index) => (
                      <div
                        key={index}
                        className={styled.CinemaName}
                        onClick={() => handleCinema(cinemaName)}
                      >
                        {cinemaName}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styled.Select_Brand}>{choicedTheater()}</div>
                <div className={styled.NextBtn} onClick={handleNextBtn}>
                  다음단계
                </div>
              </div>
            )}
            {selectPage === 2 && (
              <div className={styled.Select_2}>
                <div className={styled.Select_Time}>
                  <div className={styled.Selected_Local}>
                    {localStorage.getItem('장소')}
                  </div>
                  <div className={styled.Select_Time}>
                    날짜를 먼저 선택해주세요!
                  </div>
                </div>
                <div className={styled.Select_Others}>
                  <div className={styled.Select_Date}>
                    <Date />
                  </div>
                  <div className={styled.Selected_Movie_info}>
                    <img
                      src={localStorage.포스터URL}
                      className={styled.Selected_Movie}
                    />

                    <div className={styled.Selected_MovieTitle}>
                      {localStorage.영화}
                    </div>
                  </div>
                  <div className={styled.Selected_People}>
                    <p className={styled.Selected_People_Title}>
                      인원수 선택하기
                    </p>
                    <img src='/People.svg' className={styled.People_svg} />
                    <div className={styled.Check_Person}>
                      <img
                        src='/Minus.svg'
                        className={styled.Minus}
                        onClick={handleMinusBtn}
                      />
                      <div className={styled.Circle}>
                        <div className={styled.Circle_Number}>{count} 명</div>
                      </div>
                      <img
                        src='/Plus.svg'
                        className={styled.Plus}
                        onClick={handlePlusBtn}
                      />
                    </div>
                  </div>
                </div>

                <div className={styled.PrevBtn} onClick={handlePrevBtn}>
                  이전으로
                </div>
                <div
                  className={styled.NextBtn}
                  onClick={() => handleNextBtn(count)}
                >
                  다음단계
                </div>
              </div>
            )}
            {selectPage === 3 && (
              <div className={styled.Select_3}>
                <div className={styled.Select_Sit_Container}>
                  <div className={styled.Select_Sit}>
                    <Select_Sit />
                  </div>
                  <div className={styled.PrevBtn} onClick={handlePrevBtn}>
                    이전으로
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectTheater;
