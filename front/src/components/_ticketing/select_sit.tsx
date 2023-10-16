import React, { useState, useEffect } from 'react';
import styled from '../../styles/ticketingP_S/select.module.css';

const Select_Sit = () => {
  const numRows = 8;
  const numColumns = 13;
  const totalSeats = numRows * numColumns;

  const [selectedSeats, setSelectedSeats] = useState<boolean[][]>(
    Array(numRows)
      .fill(false)
      .map(() => Array(numColumns).fill(false))
  );

  const [selectedSeatLabels, setSelectedSeatLabels] = useState<string[]>([]);
  const [availableSeats, setAvailableSeats] = useState<number>(totalSeats);
  const selectedCount = selectedSeatLabels.length;
  const maxSelectedSeats = Number(localStorage.인원수);

  useEffect(() => {
    setAvailableSeats(maxSelectedSeats - selectedCount);
  }, [selectedSeatLabels, maxSelectedSeats]);

  const toggleSeat = (row: number, col: number) => {
    if (availableSeats > 0 || selectedSeats[row][col]) {
      setSelectedSeats((prevSelectedSeats) => {
        const newSelectedSeats = [...prevSelectedSeats];
        newSelectedSeats[row][col] = !newSelectedSeats[row][col];
        return newSelectedSeats;
      });

      const seatLabel = String.fromCharCode(65 + row) + (col + 1);
      setSelectedSeatLabels((prevSelectedSeatLabels) => {
        if (prevSelectedSeatLabels.includes(seatLabel)) {
          return prevSelectedSeatLabels.filter((label) => label !== seatLabel);
        } else {
          return [...prevSelectedSeatLabels, seatLabel];
        }
      });
    }
  };

  const renderSeatGrid = () => {
    const seatGrid = [];

    for (let row = 0; row < numRows; row++) {
      const rowSeats = [];

      for (let col = 0; col < numColumns; col++) {
        const seatLabel = String.fromCharCode(65 + row) + (col + 1);
        const isSeatSelected = selectedSeats[row][col];

        rowSeats.push(
          <div
            key={col}
            className={`${styled.Seat} ${
              isSeatSelected ? styled.Selected : styled.Unselected
            }`}
            onClick={() => toggleSeat(row, col)}
          >
            {seatLabel}
          </div>
        );
      }

      seatGrid.push(
        <div key={row} className={styled.SeatRow}>
          {rowSeats}
        </div>
      );
    }

    return seatGrid;
  };

  const resetSeats = () => {
    setSelectedSeats(
      Array(numRows)
        .fill(false)
        .map(() => Array(numColumns).fill(false))
    );
    setSelectedSeatLabels([]);
  };

  const allSelectedSeat = selectedSeatLabels.join(', ');

  // 다음단계 버튼
  const handleNextBtn = (id: string) => {
    if (selectedCount < localStorage.인원수) {
      alert(`${availableSeats}명의 좌석을 추가로 선택해주세요`);
      return;
    }
    localStorage.setItem('선택좌석', id);
    window.location.href = 'http://localhost:3000/ticketing/pay'; // 수정해야함
  };

  return (
    <>
      <div className={styled.Select_Sit}>
        <div className={styled.Sit_Info}>
          <div className={styled.Info_Txt}>
            <p>
              총 인원: {selectedCount}/{localStorage.인원수}
            </p>
            <p>선택좌석: {allSelectedSeat}</p>
          </div>
          <div className={styled.Screen}>Screen</div>
          <div className={styled.Info_Txt}>
            <p>{localStorage.getItem('장소')} 점</p>
            <p>{localStorage.getItem('영화')}</p>
          </div>
        </div>
        <div className={styled.Seat_Layout}>
          <div className={styled.Seat_Chair}>{renderSeatGrid()}</div>
        </div>
        <div className={styled.Btn_Position}>
          <button className={styled.resetBtn} onClick={resetSeats}>
            다시 선택하기
            {/* <img src={'/reset.svg'} /> */}
          </button>
        </div>
        <div
          className={styled.NextBtn}
          onClick={() => handleNextBtn(allSelectedSeat)}
        >
          다음단계
        </div>
      </div>
    </>
  );
};

export default Select_Sit;
