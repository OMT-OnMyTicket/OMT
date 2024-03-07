import axios from 'axios';
import { useAuth } from './AuthContext';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export function setupAxiosInterceptors({
  setAccessToken
}: {
  setAccessToken: (token: string) => void;
}) {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axiosInstance.get('/api/v1/auth/refresh');
          console.log('instance :', response);
          const newAccessToken = response.data.body.token;
          setAccessToken(newAccessToken);

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
