'use client';

import styled from '@/styles/loginP_S/main.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Second = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className={styled.second_Container}>
        <div
          className={styled.left_Container}
          data-aos='fade-up'
          data-aos-duration='2000'
        >
          <h1 className={styled.mainTxt2_1}>TICKET ROME</h1>
          <h2 className={styled.mainTxt2_2}>
            재미있는 영화로 <br />
            만드는 나만의 티켓
          </h2>

          <div
            className={styled.ticketImg_layout}
            data-aos='fade-rignt'
            data-aos-duration='1000'
            id='Img'
          >
            <img
              className={styled.ticketImg2}
              src='/avif/intro/back.avif'
              alt='티켓뒷면'
            />
          </div>
        </div>

        <div className={styled.right_Container}>
          <div data-aos='fade-left' data-aos-duration='1000' id='Img'>
            <img
              className={styled.ticketImg2}
              src='/avif/intro/front.avif'
              alt='티켓앞면'
            />
          </div>
          <h3 className={styled.mainTxt2_3}>
            재미있게 시청한 영화를 기록해보세요. <br />
            나만의 추억을 만들어 한 눈에 확인할 수 있어요.
          </h3>
        </div>
      </div>
    </>
  );
};

export default Second;
