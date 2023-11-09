import React, { useState, useEffect } from 'react';
import styled from '../../styles/ticketingP_S/time.module.css';

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}`;
}

function getRandomTimeCount(): number {
  // 최소 10개부터 최대 12개의 랜덤한 시간을 선택
  return Math.floor(Math.random() * (12 - 10 + 1) + 10);
}

function getRandomTimeWithSeat(): { time: string; outSeat: number }[] {
  const currentTime = getCurrentTime();
  const currentHour = parseInt(currentTime.split(':')[0], 10);

  const availableHours = Array.from({ length: 24 }, (_, index) => index);
  // 새벽 1시부터 6시 사이는 제외하고 배열에서 삭제
  const filteredHours = availableHours.filter(
    (hour) => hour >= (currentHour + 1) % 24 && hour <= 23
  );

  const randomHoursCount = getRandomTimeCount(); // 랜덤한 시간 개수

  const randomTimes: { time: string; outSeat: number }[] = [];

  while (randomTimes.length < randomHoursCount && filteredHours.length > 0) {
    const randomHour =
      filteredHours[Math.floor(Math.random() * filteredHours.length)];
    const randomMinutes = Math.floor(Math.random() * 2) * 30; // 0 또는 1에서 30 또는 0을 선택하여 분 설정
    const formattedTime = `${String(randomHour).padStart(2, '0')}:${String(
      randomMinutes
    ).padStart(2, '0')}`;
    const outSeat = getRandomNumber(0, 200);

    // 마지막 숫자가 0이나 5로 떨어지는 시간들만 추가
    if (randomMinutes === 0 || randomMinutes === 30) {
      if (!randomTimes.some((item) => item.time === formattedTime)) {
        randomTimes.push({ time: formattedTime, outSeat: outSeat });
      }
    }

    // 이미 선택한 시간을 배열에서 제거하여 중복 선택 방지
    const indexToRemove = filteredHours.indexOf(randomHour);
    if (indexToRemove !== -1) {
      filteredHours.splice(indexToRemove, 1);
    }
  }

  return randomTimes.sort((a, b) => a.time.localeCompare(b.time)); // 시간순으로 정렬된 배열로 반환
}

const Time = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [randomTimesWithSeat, setRandomTimesWithSeat] = useState(
    getRandomTimeWithSeat()
  );

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 한 번만 랜덤 시간을 생성
    setRandomTimesWithSeat(getRandomTimeWithSeat());
  }, []); // 빈 배열을 두어 처음 한 번만 실행되도록 함

  const handleTimeClick = (time: string, outSeat: number) => {
    // 클릭한 시간과 잔여 좌석 정보를 객체로 묶어서 localStorage에 저장
    const selectedTimeInfo = { time, outSeat };
    localStorage.setItem('예매정보', JSON.stringify(selectedTimeInfo));

    // 선택된 시간을 상태로 업데이트
    setSelectedTime(time);
  };

  return (
    <>
      <div className={styled.Time_Layout}>
        <div className={styled.Time_Boxes}>
          {randomTimesWithSeat.map(({ time, outSeat }, index) => (
            <div
              className={`${styled.Time_Box} ${
                time === selectedTime ? styled.Selected_Time_Box : ''
              }`}
              key={index}
              onClick={() => handleTimeClick(time, outSeat)}
            >
              <p className={styled.Time}>{time}</p>
              <div className={styled.Seat}>
                <p className={styled.Out_Seat}>{outSeat}</p>
                <p className={styled.Seat_Slash}>/</p>
                <p className={styled.Posible_Seat}>200</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Time;
