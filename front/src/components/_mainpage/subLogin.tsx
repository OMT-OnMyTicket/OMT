import styled from '../../styles/mainP_S/event.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const URL = process.env.NEXT_PUBLIC_URL;
const subLogin = () => {
  const [UserProfile, setUserProfile] = useState<string | null>(null);
  const [UserName, setUserName] = useState<string | null>(null);
  const [accessToken, setToken] = useState<string | null>(null);
  const [watchedMovies, setWatchedMovies] = useState<any[] | null>(null);
  const storedToken: string | null = localStorage.getItem('Token');
  const router = useRouter();

  useEffect(() => {
    const storedToken: string | null = localStorage.getItem('Token');

    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('UserInfo');
    if (storedUserInfo) {
      try {
        const userInfo = JSON.parse(storedUserInfo);
        setUserName(userInfo.userName);
        setUserProfile(userInfo.imageUrl);
        if (accessToken !== null) {
          axios
            .get(`${URL}/api/v1/users/movies`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              }
            })
            .then((res) => {
              const watchedMovies = res.data.body.response;
              setWatchedMovies(watchedMovies);
            })
            .catch((err) => {
              console.log('토큰이 만료되었습니다.');
            });
        }
      } catch (error) {
        console.error('Error parsing storedUserInfo:', error);
      }
    }
  }, [accessToken]);

  const handleNaverLogin = () => {
    router.push(
      `${URL}/oauth2/authorization/naver?redirect_uri=http://localhost:3000/login`
    );
    // router.push(
    //   `${URL}/oauth2/authorization/naver?redirect_uri=https://omt-onmyticket.vercel.app/login`
    // );
  };

  const handleKakaoLogin = () => {
    router.push(
      `${URL}/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/login`
    );
    // router.push(
    //   `${URL}/oauth2/authorization/kakao?redirect_uri=https://omt-onmyticket.vercel.app/login`
    // );
  };

  const handleGoogleLogin = () => {
    router.push(
      `${URL}/oauth2/authorization/google?redirect_uri=http://localhost:3000/login`
    );
    // router.push(
    //   `${URL}/oauth2/authorization/google?redirect_uri=https://omt-onmyticket.vercel.app/login`
    // );
  };

  return (
    <>
      {UserName ? (
        <div className={styled.AferLogin}>
          <div className={styled.AferLogin_User}>
            <img
              src={UserProfile ? `${UserProfile}` : '/userProfile.svg'}
              className={styled.UserProfile}
            />
            <div className={styled.UserBox}>
              <div className={styled.UserName}>{UserName} 님</div>
              <div>등급 : 영화광</div>
              <div>월 평균 : 2회 </div>
            </div>
          </div>
          <h4 className={styled.recent_Movie_bar}>최근 시청 영화</h4>
          {watchedMovies && watchedMovies.length > 0 ? (
            <div className={styled.recent_Movie_Box}>
              {watchedMovies.slice(0, 2).map((movie, index) => (
                <div key={index} className={styled.Movies}>
                  <img
                    src={movie.posterImageUrl}
                    alt='영화 포스터'
                    className={styled.recent_Movie}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={styled.EmptyMovie}>
              <img src='/png/WarningLine.png' className={styled.WarningLine} />
              <Link href={'/myticket/ticketroom'}>
                <div className={styled.EmptyMovie_Txt}>
                  최근 시청한 영화가 없습니다.
                  <p className={styled.EmptyMovie_SubTxt}>
                    해당 메시지를 클릭하면 <br />
                    My Ticket Room으로 이동합니다.
                  </p>
                </div>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className={styled.loginBox}>
          <p className={styled.loginBox_txt}>
            로그인 후 이용 가능한 서비스입니다.
          </p>
          <div className={styled.naver} onClick={handleNaverLogin}>
            <img src={'/png/네이버.png'} className={styled.login_Logo} />
            <p>네이버로 로그인하기</p>
          </div>
          <div className={styled.kakao} onClick={handleKakaoLogin}>
            <img src={'/png/카카오.png'} className={styled.login_Logo} />
            <p>카카오로 로그인하기</p>
          </div>
          <div className={styled.google} onClick={handleGoogleLogin}>
            <img src={'/png/구글.png'} className={styled.login_Logo} />
            <p>구글로 로그인하기</p>
          </div>
        </div>
      )}
    </>
  );
};

export default subLogin;
