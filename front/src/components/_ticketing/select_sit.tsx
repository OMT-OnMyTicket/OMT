import React, { useState, useEffect } from 'react';
import styled from '../../styles/ticketingP_S/select.module.css';
import { useRouter } from 'next/navigation';

interface ReservationInfo {
  outSeat?: number;
}

const Select_Sit: React.FC = () => {
  const router = useRouter();
  const numRows: number = 8;
  const numColumns: number = 13;

  const [selectedSeatLabels, setSelectedSeatLabels] = useState<string[]>([]);
  const [reservedSeats, setReservedSeats] = useState<string[]>([]);

  const selectedCount: number = selectedSeatLabels.length;

  useEffect(() => {
    const reservationInfo: ReservationInfo = JSON.parse(
      localStorage.getItem('예매정보') || '{}'
    );
    const outSeat: number = 104 - Number(reservationInfo.outSeat) || 0;

    // Generate a list of all seat labels
    const allSeatLabels: string[] = Array.from(
      { length: numRows * numColumns },
      (_, index) =>
        String.fromCharCode(65 + Math.floor(index / numColumns)) +
        ((index % numColumns) + 1)
    );

    // Shuffle the array of all seat labels
    const shuffledSeatLabels = shuffleArray(allSeatLabels);

    // Select the first "outSeat" labels as reserved seats
    const reservedSeatLabels: string[] = shuffledSeatLabels.slice(0, outSeat);

    setReservedSeats(reservedSeatLabels);
  }, []);

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array: any[]) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }

    return array;
  };

  const renderSeatGrid = () => {
    const seatGrid: JSX.Element[] = [];

    const handleSeatClick = (seatLabel: string) => {
      if (reservedSeats.includes(seatLabel)) {
        alert('이 좌석은 이미 선택된 좌석입니다.');
        return;
      }

      if (selectedSeatLabels.includes(seatLabel)) {
        setSelectedSeatLabels((prevSelected) =>
          prevSelected.filter((label) => label !== seatLabel)
        );
      } else {
        if (selectedCount >= Number(localStorage.인원수)) {
          alert('선택 가능 인원을 초과했습니다.');
          return;
        }
        setSelectedSeatLabels((prevSelected) => [...prevSelected, seatLabel]);
      }
    };

    for (let row = 0; row < numRows; row++) {
      const rowSeats: JSX.Element[] = [];

      for (let col = 0; col < numColumns; col++) {
        const seatLabel: string = String.fromCharCode(65 + row) + (col + 1);

        rowSeats.push(
          <div
            key={col}
            className={`${styled.Seat} ${
              selectedSeatLabels.includes(seatLabel) && styled.userSelect
            } ${reservedSeats.includes(seatLabel) && styled.Selected}`}
            onClick={() => handleSeatClick(seatLabel)}
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

  const allSelectedSeat: string = selectedSeatLabels.join(', ');

  // 다음단계 버튼
  const handleNextBtn = (id: string) => {
    if (selectedCount < localStorage.인원수) {
      alert(
        `${localStorage.인원수 - selectedCount}명의 좌석을 추가로 선택해주세요`
      );

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
          다음으로
        </div>
      </div>
    </>
  );
};

export default Select_Sit;
