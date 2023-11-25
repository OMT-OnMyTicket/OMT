import styled from '../../styles/mainP_S/event.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

  return (
    <div className={styled.Container}>
      <h1>정보</h1>
      <div className={styled.Content_Layout}>
        <div className={styled.Slider_Layout}>
          <Slider {...settings}>
            <div className={styled.Slider}>
              <a
                href={'https://www.megabox.co.kr/event/detail?eventNo=14543'}
                target='_blank'
              >
                <div className={styled.Slider_Photo}>
                  <img
                    src='https://img.megabox.co.kr/SharedImg/BnftMng/2023/11/20/GPU5O3hjlotPlK3raMmDn8kb8v3BNMJb.png'
                    className={styled.leftPhoto}
                  />

                  <img
                    src='https://img.megabox.co.kr/SharedImg/BnftMng/2023/11/20/zFurfr7mJnyn3SSMs47MgMAjGuOOAkeV.png'
                    className={styled.rightPhoto}
                  />
                </div>
              </a>
            </div>
            <div className={styled.Slider}>
              <a
                href={'https://thessencard.co.kr/event/megabox'}
                target='_blank'
              >
                <div className={styled.Slider_Photo}>
                  <img
                    src='https://img.megabox.co.kr/SharedImg/BnftMng/2023/03/14/epS6oiqHOSFccJicF3hl5x6xZeIgjP22.png'
                    className={styled.leftPhoto}
                  />

                  <img
                    src='https://img.megabox.co.kr/SharedImg/BnftMng/2023/03/14/h8fwVvz9E5ktcOWtHjWSR0mMN2XnpxO0.png'
                    className={styled.rightPhoto}
                  />
                </div>
              </a>
            </div>
            <div className={styled.Slider}>
              <a
                href={
                  'http://www.cgv.co.kr/culture-event/event/detailViewUnited.aspx?SEQ=37443'
                }
                target='_blank'
              >
                <div className={styled.Slider_Photo}>
                  <img
                    src='http://img.cgv.co.kr/Event/Event/2023/0616/16869060915990.jpg'
                    className={styled.singlePhoto}
                  />
                </div>
              </a>
            </div>
            <div className={styled.Slider}>
              <a
                href={
                  'http://www.cgv.co.kr/culture-event/event/detailViewUnited.aspx?seq=39014&menu=001'
                }
                target='_blank'
              >
                <div className={styled.Slider_Photo}>
                  <img
                    src='https://img.cgv.co.kr/WebApp/contents/eventV4/39014/17001853707260.jpg'
                    className={styled.singlePhoto}
                  />
                </div>
              </a>
            </div>
            <div className={styled.Slider}>
              <a
                href={
                  'https://event.lottecinema.co.kr/NLCHS/Event/EventTemplateInfo?eventId=501010024723036'
                }
                target='_blank'
              >
                <div className={styled.Slider_Photo}>
                  <img
                    src='https://caching.lottecinema.co.kr//Media/Event/630c3dda15864a92b9a6f9c87c136f19.png'
                    className={styled.singlePhoto}
                  />
                </div>
              </a>
            </div>
            <div className={styled.Slider}>
              <a
                href={
                  'http://www.cgv.co.kr/culture-event/event/detailViewUnited.aspx?seq=38924'
                }
                target='_blank'
              >
                <div className={styled.Slider_Photo}>
                  <img
                    src='https://img.cgv.co.kr/WebApp/contents/eventV4/38924/16994915907830.jpg'
                    className={styled.singlePhoto}
                  />
                </div>
              </a>
            </div>
          </Slider>
          <div className={styled.Box_Layout}>
            <div className={styled.left_Box}>
              <a
                href={'https://www.youtube.com/watch?v=OquYKZLUJmY'}
                target='_blank'
              >
                <img
                  src='https://i.ytimg.com/vi/OquYKZLUJmY/maxresdefault.jpg'
                  className={styled.poster}
                />
              </a>
              <div className={styled.poster_Txt}>
                <h3> 개봉예정작</h3>
                <h5>싱글 인 서울</h5>
                <h5>11월 29일 대개봉</h5>
              </div>
            </div>
            <div className={styled.right_Box}></div>
          </div>
        </div>
        <div className={styled.User}>
          <div className={styled.loginBox}>
            <p className={styled.loginBox_txt}>
              로그인 후 이용 가능한 서비스입니다.
            </p>
            <div className={styled.naver}>
              <img src={'/png/네이버.png'} className={styled.login_Logo} />
              <p>네이버로 로그인하기</p>
            </div>
            <div className={styled.kakao}>
              <img src={'/png/카카오.png'} className={styled.login_Logo} />
              <p>카카오로 로그인하기</p>
            </div>
            <div className={styled.google}>
              <img src={'/png/구글.png'} className={styled.login_Logo} />
              <p>구글로 로그인하기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Event;
