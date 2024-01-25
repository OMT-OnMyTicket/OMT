// access_token만 짤라서 로컬스토리지에 저장하고
// 홈으로 이동시킨다.
// oauth/redirect

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
      console.log('Access Token:', accessToken);

      localStorage.setItem('Token', JSON.stringify(accessToken));

      axios
        .get(`${OAuthURL}/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res) => {
          console.log('Axios Response:', res.data);
          const UserInfo = res.data.body.response;
          localStorage.setItem('UserInfo', JSON.stringify(UserInfo));
          router.push('/home');
        })
        .catch((error) => {
          console.error('Axios Error:', error);
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
