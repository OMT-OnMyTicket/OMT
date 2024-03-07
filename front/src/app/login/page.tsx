'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import axios from 'axios';
import { useEffect } from 'react';

const OAuthURL = process.env.NEXT_PUBLIC_URL;

const OAuth2 = () => {
  const router = useRouter();
  const { setAccessToken } = useAuth();

  if (typeof window !== 'undefined') {
    const url: string = window.location.href;
    const urlSearchParams: URLSearchParams = new URLSearchParams(
      url.split('?')[1]
    );
    const accessToken: string | null = urlSearchParams.get('token');

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (accessToken) {
            setAccessToken(accessToken);
            const res = await axios.get(`${OAuthURL}/api/v1/users`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });

            const UserInfo = res.data.body.response;
            localStorage.setItem('UserInfo', JSON.stringify(UserInfo));
            // 다른 정보도 필요하면 Context에 저장 가능
            router.push('/home');
          }
        } catch (error) {
          console.error('Axios Error:', error);
        }
      };

      fetchData();
    }, [accessToken]);
  }

  return (
    <>
      <div></div>
    </>
  );
};

export default OAuth2;
