'use client';

import React, { useState } from 'react';
import styled from '../../styles/ticketingP_S/select.module.css';
import PageCheck from '../pageCheck';

const SelectTheater = () => {
  const activePage = 3;
  const [select1Visible, setSelect1Visible] = useState(true);

  // 첫 페이지 다음단계 버튼 (선택한 영화관 제출하고 false로 변경시키면 됨)
  const handleNextBtn = () => {
    setSelect1Visible(false);
  };
  // 두번쨰 페이지 이전단계 버튼
  const handlePrevBtn = () => {
    setSelect1Visible(true);
  };
  // 두번째 페이지 다음단계 버튼 (선택한 시간 인원수 제출후 다음 페이지로 Link) check

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
            {select1Visible ? (
              <div className={styled.Select_1}>
                <div className={styled.Select_Local}>지역</div>
                <div className={styled.Select_Theater}>지역별 영화관</div>
                <div className={styled.Select_Brand}>CGV</div>
                <div className={styled.NextBtn} onClick={handleNextBtn}>
                  다음단계
                </div>
              </div>
            ) : null}
            {!select1Visible ? (
              <div className={styled.Select_2}>
                <div className={styled.Select_Time}>
                  <div>강남</div>
                  <div>영화 시간 List 나열</div>
                </div>
                <div className={styled.Select_Others}>
                  <div>날짜선택</div>
                  <div>선택한 영화</div>
                  <div>인원수 선택하기</div>
                </div>

                <div className={styled.PrevBtn} onClick={handlePrevBtn}>
                  이전으로
                </div>
                <div className={styled.NextBtn} onClick={handleNextBtn}>
                  다음단계
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectTheater;
