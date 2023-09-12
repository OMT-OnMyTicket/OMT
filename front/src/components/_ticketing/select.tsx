'use client';

import React, { useState } from 'react';
import styled from '../../styles/ticketingP_S/select.module.css';
import PageCheck from '../pageCheck';
import Select_Sit from './select_sit';

const SelectTheater = () => {
  const [count, setcount] = useState(1);
  const [selectPage, setSelectPage] = useState(1);
  const activePage = 3;

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
                <div className={styled.Select_Local}>지역</div>
                <div className={styled.Select_Theater}>지역별 영화관</div>
                <div className={styled.Select_Brand}>{localStorage.영화관}</div>
                <div className={styled.NextBtn} onClick={handleNextBtn}>
                  다음단계
                </div>
              </div>
            )}
            {selectPage === 2 && (
              <div className={styled.Select_2}>
                <div className={styled.Select_Time}>
                  <div className={styled.Selected_Local}>강남</div>
                  <div className={styled.Select_Time}>영화 시간 List 나열</div>
                </div>
                <div className={styled.Select_Others}>
                  <div className={styled.Select_Date}>2023.08.30(수)</div>
                  <div className={styled.Selected_Movie_info}>
                    <div className={styled.Selected_Movie}></div>
                    <div>{localStorage.영화}</div>
                  </div>
                  <div className={styled.Selecte_People}>
                    <p className={styled.Selecte_People_Title}>
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
                  <div className={styled.NextBtn} onClick={handleNextBtn}>
                    다음단계
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
