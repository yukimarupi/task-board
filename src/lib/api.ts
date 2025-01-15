import axios from 'axios';
import { API_URL } from './config';
import logout from '@/lib/logout'; // エイリアスを利用

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプターでトークンを付加
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('リクエストエラー:', error);
    return Promise.reject(error);
  }
);

// レスポンスインターセプターで401エラーを処理
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('認証エラー: セッションの有効期限が切れています。');
      logout(); // セッションが切れた場合にログアウト
    }
    return Promise.reject(error);
  }
);

export default apiClient;
