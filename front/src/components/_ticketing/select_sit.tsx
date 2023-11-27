import React, { useState, useEffect } from 'react';
import styled from '../../styles/ticketingP_S/select.module.css';
import { useRouter } from 'next/navigation';

const Select_Sit = () => {
  const router = useRouter();
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

  // localStorage에서 예매정보를 가져옵니다.
  const reservationInfoString = localStorage.getItem('예매정보');

  // reservationInfoString이 존재하면 JSON 형식으로 파싱하여 객체로 변환합니다.
  // 존재하지 않으면 기본값으로 빈 객체를 사용합니다.
  const reservationInfo = reservationInfoString
    ? JSON.parse(reservationInfoString)
    : {};

  const reservedSeatsFromLocalStorage = reservationInfo.outSeat || 0;

  const [reservedSeats, setReservedSeats] = useState<string[]>([]);

  useEffect(() => {
    setAvailableSeats(maxSelectedSeats - selectedCount);

    // 랜덤으로 reservedSeatsFromLocalStorage 수만큼 좌석을 선택하여 검은색으로 설정
    const randomlyReservedSeats: string[] = [];
    while (randomlyReservedSeats.length < reservedSeatsFromLocalStorage) {
      const randomRow = Math.floor(Math.random() * numRows);
      const randomCol = Math.floor(Math.random() * numColumns);
      const seatLabel = String.fromCharCode(65 + randomRow) + (randomCol + 1);
      // 이미 선택되지 않은 좌석만 선택하도록 확인
      if (!randomlyReservedSeats.includes(seatLabel)) {
        randomlyReservedSeats.push(seatLabel);
      }
    }
    setReservedSeats(randomlyReservedSeats);
    setSelectedSeats((prevSelectedSeats) => {
      const newSelectedSeats = prevSelectedSeats.map((row) => [...row]);
      for (const seat of randomlyReservedSeats) {
        const row = seat.charCodeAt(0) - 65;
        const col = parseInt(seat.slice(1)) - 1;
        newSelectedSeats[row][col] = true;
      }
      return newSelectedSeats;
    });
  }, [reservedSeatsFromLocalStorage]);

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

  const allSelectedSeat = selectedSeatLabels.join(', ');

  // 다음단계 버튼
  const handleNextBtn = (id: string) => {
    if (selectedCount < localStorage.인원수) {
      alert(`${availableSeats}명의 좌석을 추가로 선택해주세요`);

      return;
    } else if (selectedCount > localStorage.인원수) {
      alert(
        `선택한 좌석이 ${localStorage.인원수}명을 초과하였습니다. 다시 선택해주세요.`
      );
      // 선택한 좌석 초기화

      return;
    }
    // 선택한 좌석이 인원수와 일치하면 다음 단계로 넘어감
    localStorage.setItem('선택좌석', id);
    router.push('/ticketing/pay');
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
