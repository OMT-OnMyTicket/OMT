'use client';
import styled from '../../styles/mainP_S/event.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import SubLogin from './subLogin';

const Event = () => {
  // Slider settings
  const settings = {
    rows: 1,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    slidesPerRow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    variableWidth: true
  };

  const eventDetails = [
    {
      title: '< 위시 >',
      imgSrc:
        'https://img.megabox.co.kr/SharedImg/BnftMng/2024/01/01/lqIzLCekvJjaNDEU5Yx6LDETHqS9S7MM.jpg'
    },
    {
      title: '< 사카모토 >',
      imgSrc:
        'https://img.megabox.co.kr/SharedImg/BnftMng/2023/12/26/wVnat2pnIJ4nKdNPR4dKVnfLwBKgP97Z.jpg'
    },
    {
      title: '< 서울의 봄 >',
      imgSrc:
        'https://img.megabox.co.kr/SharedImg/BnftMng/2023/12/21/x3FACJZL2PfZTESeNzRIfqsmyTEzl5CE.jpg'
    },
    {
      title: '< 노량 >',
      imgSrc:
        'https://img.megabox.co.kr/SharedImg/BnftMng/2023/12/20/vBEJB2GJgcTwyl0D9ZW7HeDempMBWqj4.png'
    },
    {
      title: '< 아쿠아맨 >',
      imgSrc:
        'https://img.megabox.co.kr/SharedImg/BnftMng/2023/12/18/ddLigu5OiSTbl83TFLws9KklWzRajrv3.jpg'
    }
  ];

  return (
    <div className={styled.Container}>
      <h2>정보</h2>
      <div className={styled.Content_Layout}>
        <div className={styled.Slider_Layout}>
          <Slider {...settings}>
            {eventDetails.map((event, index) => (
              <div key={index} className={styled.Slider}>
                <Link href={'/myticket/ticketroom'}>
                  <div className={styled.Slider_Photo}>
                    <img
                      src='/png/omt_event.png'
                      className={styled.leftPhoto}
                    />
                    <img
                      src={event.imgSrc}
                      alt={`${event.title} 티켓`}
                      className={styled.rightPhoto}
                    />
                    <div className={styled.event_ticketTxt}>
                      {event.title} 본 뒤 OMT가 제안하는 <br /> 나만의 티켓 제작
                      <p className={styled.event_ticket_SubTxt}>
                        해당 이미지를 클릭하면 나만의 티켓룸으로 이동합니다.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
          <div className={styled.Box_Layout}>
            <div className={styled.left_Box}>
              <a
                href={'https://www.youtube.com/watch?v=BR5YCAxjbwc&t=5s'}
                target='_blank'
              >
                <img
                  src='https://i.ytimg.com/vi/81JOj5-xNGc/maxresdefault.jpg'
                  className={styled.poster}
                />
              </a>
              <div className={styled.poster_Txt}>
                <h3> 개봉예정작</h3>
                <h5>듄 파트2</h5>
                <h5>2월 IMAX 대개봉</h5>
              </div>
            </div>
            <div className={styled.right_Box}></div>
          </div>
        </div>
        <div className={styled.User}>{/* <SubLogin /> */}</div>
      </div>
    </div>
  );
};
export default Event;
