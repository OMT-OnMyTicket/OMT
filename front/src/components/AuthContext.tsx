'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react';
import { useRouter } from 'next/navigation';
interface AuthContextProps {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    const userInfo = localStorage.getItem('UserInfo');
    if (userInfo && accessToken === null) {
      localStorage.clear();
      alert('토큰이 만료되어 재 로그인이 필요합니다.');
      router.push('/home');
    }
  });

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 반드시 AuthProvider와 사용되어야 합니다.');
  }
  return context;
};
