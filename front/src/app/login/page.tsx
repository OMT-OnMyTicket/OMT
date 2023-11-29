// access_token만 짤라서 로컬스토리지에 저장하고
// 홈으로 이동시킨다.
// oauth/redirect

// 헬핏
// http://localhost:3000/oauth2/receive?access_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAyNDY4NTgwMjYxOTI2NTM1OTkiLCJyb2xlIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjc5NjcyMzYyfQ.9x6MEY0Z7DO2TvwBv8SRl0wuLkVWDnegyiKENdlFqiE

// OMT
//  http://ec2-3-34-47-93.ap-northeast-2.compute.amazonaws.com:8080/?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAyNDY4NTgwMjYxOTI2NTM1OTkiLCJyb2xlIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzAxMDY4OTIxfQ.syvAn0ap4b1NLaVLwMegP8rMsFVcllGsd_b8ojb7nYI

'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const OAuthURL = process.env.NEXT_PUBLIC_URL;

const OAuth2 = () => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    const url: string = window.location.href;

    // URLParams에서 잘라오기
    const urlSearchParams: URLSearchParams = new URLSearchParams(
      url.split('?')[1]
    );
    const accessToken: string | null = urlSearchParams.get('token');

    if (accessToken) {
      axios
        .get(`${OAuthURL}/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res) => {
          const UserInfo = res.data.body.user;
          localStorage.setItem('UserInfo', JSON.stringify(UserInfo));
          // console.log(JSON.parse(localStorage.UserInfo).userName); // 유저명
          // console.log(JSON.parse(localStorage.UserInfo).imageUrl); // 프로필사진
          router.push('/home');
          // console.log(UserInfo);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <>
      <div>Oauth</div>
    </>
  );
};
export default OAuth2;