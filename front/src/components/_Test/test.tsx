import React from 'react';

function getRandomTime() {
  const hours = Math.floor(Math.random() * (23 - 8 + 1)) + 8; // Generate random hour between 8 and 23 (11 PM)
  const minutes = Math.floor(Math.random() * 60); // Generate random minutes between 0 and 59
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}

function generateRandomTimes() {
  const randomTimes: string[] = [];
  let previousTime = '08:00'; // Start from 8:00 AM

  for (let i = 0; i < 12; i++) {
    const nextHour = (parseInt(previousTime.slice(0, 2)) + 1)
      .toString()
      .padStart(2, '0');
    const nextTime = `${nextHour}:${previousTime.slice(3)}`;

    const randomHour = getRandomTime();

    if (parseInt(randomHour.slice(0, 2)) + 1 < parseInt(nextHour)) {
      // Ensure the generated time is at least 1 hour apart from the previous one
      randomTimes.push(randomHour);
      previousTime = randomHour;
    }
  }

  return randomTimes;
}

const RandomTimes = () => {
  const randomTimes = generateRandomTimes();

  return (
    <div>
      <h1>Random Times</h1>
      <ul>
        {randomTimes.map((time, index) => (
          <li key={index}>{time}</li>
        ))}
      </ul>
      <div>ji</div>
    </div>
  );
};

export default RandomTimes;
