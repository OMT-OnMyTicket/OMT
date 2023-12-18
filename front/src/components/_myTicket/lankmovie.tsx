import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from '../../styles/myticketP_S/myTicketHome.module.css';

const LankedMovie = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className={styled.MoviePosters}>
        <div
          className={styled.MoviePoster}
          data-aos='fade-up'
          data-aos-duration='1500'
        >
          1
        </div>
        <div
          className={styled.MoviePoster}
          data-aos='fade-up'
          data-aos-duration='2000'
        >
          2
        </div>
        <div
          className={styled.MoviePoster}
          data-aos='fade-up'
          data-aos-duration='2500'
        >
          3
        </div>
        <div
          className={styled.MoviePoster}
          data-aos='fade-up'
          data-aos-duration='3000'
        >
          4
        </div>
      </div>
    </>
  );
};
export default LankedMovie;
