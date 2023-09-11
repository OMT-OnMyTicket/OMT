import React, { useState } from 'react';
import styled from '../../styles/ticketingP_S/select.module.css';

const Select_Sit = () => {
  const numRows = 8;
  const numColumns = 13;

  const [selectedSeats, setSelectedSeats] = useState<boolean[][]>(
    Array(numRows)
      .fill(false)
      .map(() => Array(numColumns).fill(false))
  );

  const [selectedSeatLabels, setSelectedSeatLabels] = useState<string[]>([]);

  const toggleSeat = (row: number, col: number) => {
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

  return (
    <>
      <div className={styled.Select_Sit}>
        <div className={styled.Sit_Info}>
          <div className={styled.Info_Txt}>
            <p>총 인원: 7</p>
            <p>선택좌석: {selectedSeatLabels.join(', ')}</p>
          </div>
          <div className={styled.Screen}>Screen</div>
          <div className={styled.Info_Txt}>
            <p>강남 본관4</p>
            <p>오펜하이머</p>
          </div>
        </div>
        <div className={styled.Seat_Layout}>
          <div className={styled.Seat_Chair}>{renderSeatGrid()}</div>
        </div>
      </div>
    </>
  );
};

export default Select_Sit;
