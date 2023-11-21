import styled from '../../styles/mainP_S/mySection.module.css';

const Section = () => {
  return (
    <>
      <div className={styled.Comment_Layout}>
        <div className={styled.Movie_Price}>
          <div>
            <div>
              <h2>영화 관람권</h2>
              <p style={{ color: '#bfbbbb' }}>해당 가격은 조조를 포함합니다.</p>
            </div>
            <div className={styled.Movie_Tickets}>
              <div className={styled.ticket_Info}>
                <img src='/png/CGV관람권.png' className={styled.ticket_png} />
                <div className={styled.Ticket_Price_Txt}>
                  <h4>CGV</h4>
                  <p>평일: 10000 ~ 14000원</p>
                  <p>공휴일: 11000 ~ 15000원</p>
                </div>
              </div>
              <div className={styled.ticket_Info}>
                <img
                  src='/png/메가박스관람권.png'
                  className={styled.ticket_png}
                />
                <div className={styled.Ticket_Price_Txt}>
                  <h4>메가박스</h4>
                  <p>평일: 10000 ~ 14000원</p>
                  <p>공휴일: 11000 ~ 15000원</p>
                </div>
              </div>
              <div className={styled.ticket_Info}>
                <img
                  src='/png/롯데시네마관람권.png'
                  className={styled.ticket_png}
                />
                <div className={styled.Ticket_Price_Txt}>
                  <h4>롯데시네마</h4>
                  <p>평일: 10000 ~ 14000원</p>
                  <p>공휴일: 11000 ~ 15000원</p>
                </div>
              </div>
              <div className={styled.ticket_Info}>
                <img
                  src='/png/시네큐관람권.png'
                  className={styled.ticket_png}
                />
                <div className={styled.Ticket_Price_Txt}>
                  <h4>시네큐</h4>
                  <p>평일: 9000 ~ 13000원</p>
                  <p>공휴일: 10000 ~ 14000원</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styled.Comment_Box}>
            <h2>시사회 정보</h2>
            <p style={{ color: '#bfbbbb' }}>
              아래를 클릭하면 시사회 정보를 얻는 페이지로 이동합니다.
            </p>
            <a href='https://www.maxmovie.com/event' target='_blank'>
              <img src='/png/시사회정보.png' className={styled.ShowPng} />
            </a>
          </div>
          <div className={styled.Comment_Box}>
            <div className={styled.Notice}>
              <h3 className={styled.h3}>공지사항</h3>
              <p className={styled.Txt}>
                [개발] 나만의 티켓, 빠른예매는 현재 개발 진행중입니다.
              </p>
            </div>
            <div className={styled.Question}>
              <h3 className={styled.h3}>문의사항</h3>
              <p className={styled.Txt}>이메일 : stackover.hoon@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section;
