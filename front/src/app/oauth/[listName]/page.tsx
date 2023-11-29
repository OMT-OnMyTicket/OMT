// access_token만 짤라서 로컬스토리지에 저장하고
// 홈으로 이동시킨다.
// oauth/redirect

// OMT

// http://localhost:8080/oauth2/authorization/{provider-id}?redirect_uri=http://localhost:3000/oauth/redirect
// http://localhost:3000/login/oauth2/code/google

// http://localhost:8080/oauth?
// http://localhost:3000/oauth/redirect?

// http://localhost:3000/login/oauth2/code/google?state=KPhZSqaxlin89zYPbGk69pi5Z6cWc8F3BHSZptxXAfs%3D&code=4%2F0AfJohXnMXSLWP8pWPkxbjvFx55vEjqCi2hmZDR0vaTYcbByyoIu7r5YPfzEFUTd5c4HSeQ&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=0&prompt=consent
// state=KPhZSqaxlin89zYPbGk69pi5Z6cWc8F3BHSZptxXAfs%3D&
// code=4%2F0AfJohXnMXSLWP8pWPkxbjvFx55vEjqCi2hmZDR0vaTYcbByyoIu7r5YPfzEFUTd5c4HSeQ&
// scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&
// authuser=0&prompt=consent

// 헬핏
// http://localhost:3000/oauth2/receive?access_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAyNDY4NTgwMjYxOTI2NTM1OTkiLCJyb2xlIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjc5NjcyMzYyfQ.9x6MEY0Z7DO2TvwBv8SRl0wuLkVWDnegyiKENdlFqiE
// access_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAyNDY4NTgwMjYxOTI2NTM1OTkiLCJyb2xlIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjc5NjcyMzYyfQ.9x6MEY0Z7DO2TvwBv8SRl0wuLkVWDnegyiKENdlFqiE

'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const OAuth2 = () => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    const url: string = window.location.href;

    // URLParams에서 잘라오기
    const urlSearchParams: URLSearchParams = new URLSearchParams(
      url.split('?')[1]
    );
    const accessToken: string | null = urlSearchParams.get('access_token');

    const OAuthURL = process.env.NEXT_PUBLIC_URL;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      axios
        .get(`${OAuthURL}/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res) => {
          const UserInfo = res.data.body.data;
          localStorage.setItem('UserInfo', JSON.stringify(UserInfo));
          // console.log(JSON.parse(localStorage.UserInfo).email);
          router.push('/home');
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
