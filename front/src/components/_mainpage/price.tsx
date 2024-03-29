import styled from '../../styles/mainP_S/mySection.module.css';

const Price = () => {
  const ticketInfo = [
    {
      name: 'CGV',
      link: 'http://www.cgv.co.kr/theaters/theaterPrice.aspx',
      imageSrc: '/avif/home/CGV관람권.avif',
      prices: {
        weekday: '평일: 10000 ~ 14000원',
        holiday: '공휴일: 11000 ~ 15000원'
      }
    },
    {
      name: '메가박스',
      link: 'https://www.megabox.co.kr/store/megaticket',
      imageSrc: '/avif/home/메가박스관람권.avif',
      prices: {
        weekday: '평일: 10000 ~ 14000원',
        holiday: '공휴일: 11000 ~ 15000원'
      }
    },
    {
      name: '롯데시네마',
      link: 'https://www.lottecinema.co.kr/NLCHS/CinemaMall',
      imageSrc: '/avif/home/롯데시네마관람권.avif',
      prices: {
        weekday: '평일: 10000 ~ 14000원',
        holiday: '공휴일: 11000 ~ 15000원'
      }
    }
  ];

  return (
    <>
      <div className={styled.Comment_Layout}>
        <div className={styled.Movie_Price}>
          <div>
            <div>
              <h2 className={styled.title}>영화 관람권</h2>
              <p style={{ color: '#bfbbbb' }}>
                티켓 이미지를 클릭하면 상세한 가격 정보를 확인할 수 있습니다.
              </p>
            </div>
            <div className={styled.Movie_Tickets}>
              {ticketInfo.map((ticket, index) => (
                <div key={index} className={styled.ticket_Info}>
                  <a
                    href={ticket.link}
                    target='_blank'
                    title={`${ticket.name} 관람권 링크`}
                  >
                    <img
                      src={ticket.imageSrc}
                      className={styled.ticket_png}
                      alt={`${ticket.name}관람권`}
                    />
                  </a>
                  <div className={styled.Ticket_Price_Txt}>
                    <h3>{ticket.name}</h3>
                    <p>{ticket.prices.weekday}</p>
                    <p>{ticket.prices.holiday}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className={styled.Comment_Box}>
            <h2 className={styled.title}>시사회 정보</h2>
            <p style={{ color: '#bfbbbb' }}>
              아래를 클릭하면 시사회 정보를 얻는 페이지로 이동합니다.
            </p>
            <a
              href='https://www.maxmovie.com/event'
              target='_blank'
              title='MAXMOVIE_LINK'
            >
              <img
                src='/avif/home/시사회정보.avif'
                className={styled.ShowPng}
                alt='시사회정보'
              />
            </a>
          </div>
          <div className={styled.Comment_Box}>
            <div className={styled.Notice}>
              <h3 className={styled.h3}>공지사항</h3>
              <p className={styled.Txt}>
                [개발] PC,Tablet 환경을 지원중입니다. 모바일 - 개발예정
              </p>
              <p className={styled.Txt}></p>
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

export default Price;
