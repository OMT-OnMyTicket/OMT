'use client';

import styled from '../../../styles/myticketP_S/ticketPage.module.css';
import React, { useEffect, useState } from 'react';

const Ticket = () => {
  const [Title, setTitle] = useState<string | null>(null);
  const [posterImageUrl, setPosterImageUrl] = useState<string>('');
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    const storedTitle = localStorage.getItem('영화제목');
    const storedPosterUrl = localStorage.getItem('posterUrl');

    if (storedTitle) {
      setTitle(storedTitle);
    }
    if (storedPosterUrl) {
      setPosterImageUrl(storedPosterUrl);
    }
  }, []);

  return (
    <>
      <div className={styled.Layout}>
        <div className={styled.ticket_header}>
          <img src='/back.svg' className={styled.back} />
          <div className={styled.Ticket_Tilte}>{Title}</div>
        </div>

        <div className={styled.Ticket_Layout}>
          <div className={styled.MovieTicket_Layout}>
            <img src='/png/Circle.png' className={styled.Circle} />
            <img src={posterImageUrl} className={styled.MovieTicket} />
          </div>

          <div className={styled.TextTicket_Layout}>
            <img src='/png/Circle.png' className={styled.Circle} />
            <img src={posterImageUrl} className={styled.TextTicket} />
            <div className={styled.Write_Layout}>
              <div className={styled.Togeter}>
                <div className={styled.Write_Title}>함께 본 사람</div>
                <div className={styled.TextArea_Layout}>
                  <textarea
                    placeholder='영화를 함께 본 사람을 입력해주세요.'
                    // value={textValue}
                    className={styled.Togeter_TextArea}
                  ></textarea>
                </div>
              </div>
              <div className={styled.MyRewiew}>
                <div className={styled.Write_Title}>나만의 리뷰</div>
                <div className={styled.TextArea_Layout}>
                  <textarea
                    placeholder='영화에 대한 나만의 리뷰를 남겨봐요.'
                    // value={textValue}
                    className={styled.Review_TextArea}
                  ></textarea>
                </div>
              </div>
              <div className={styled.MyScore}>
                <div className={styled.Write_Title}>나만의 평점</div>
              </div>
            </div>
          </div>
        </div>

        <img src='/png/글쓰기.png' className={styled.WriteHand} />
      </div>
    </>
  );
};
export default Ticket;
