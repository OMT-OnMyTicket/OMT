'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from '@/styles/loginP_S/main.module.css';

interface Theater {
  name: string;
  duration?: number;
}

interface TheaterComponentProps extends Theater {}

const TheaterComponent: React.FC<TheaterComponentProps> = ({
  name,
  duration
}) => (
  <div
    className={styled.theater}
    data-aos='fade-down'
    data-aos-duration={duration}
  >
    <img src={`/png/${name}.png`} className={styled.theater_icon} alt={name} />
  </div>
);

const Third: React.FC = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const theaters: Theater[] = [
    { name: '롯데시네마', duration: 3000 },
    { name: 'CGV', duration: 1500 },
    { name: 'OMT_web' },
    { name: '메가박스', duration: 1500 }
  ];

  return (
    <div className={styled.third_Container}>
      <div
        className={styled.third_header}
        data-aos='fade-up'
        data-aos-duration='2000'
      >
        <h1 className={styled.mainTxt2_1}>TICKETING</h1>
        <h2 className={styled.mainTxt2_2}>
          예매, <br />
          모든 예매를 한 곳에서
        </h2>
      </div>

      <div className={styled.theater_Layout}>
        {theaters.map((theater, index) => (
          <TheaterComponent key={index} {...theater} />
        ))}
      </div>

      <div className={styled.third_Contents}>
        <h3
          className={styled.mainTxt3_1}
          data-aos='fade-down'
          data-aos-duration='2000'
        >
          모든 영화관을 <br />한 곳에서
        </h3>

        <div data-aos='fade-up' data-aos-duration='1000' id='Img'>
          <img
            src='https://static.toss.im/screens/iPhone12_Clay_Shadow.png'
            className={styled.phoneImg}
          />
        </div>

        <h3
          className={styled.mainTxt3_1}
          data-aos='fade-down'
          data-aos-duration='3000'
        >
          영화관 별 <br />
          비교까지
        </h3>

        <div
          className={styled.phone_Content}
          data-aos='fade-up'
          data-aos-duration='3000'
          id='Img'
        >
          <img className={styled.phoneTop} src='/png/phoneTop.png' />
          <img className={styled.phoneBtm} src='/png/phoneBtm.png' />
        </div>
      </div>
    </div>
  );
};

export default Third;
