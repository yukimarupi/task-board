import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import apiClient from '@/lib/api';

type LoginResponse = {
  user: {
    id: string;
    username: string;
    role: string;
    image?: string;
  };
  token: string;
};

type RegisterResponse = {
  user: {
    id: string;
    username: string;
    role: string;
    image?: string;
  };
};

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const loginMutation = useMutation<
    LoginResponse,
    { response?: { data?: { error?: string } }; message: string },
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      const response = await apiClient.post<LoginResponse>('/users/login', {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      setEmail('');
      setPassword('');
      router.push('/');
    },
    onError: (error) => {
      alert(
        error.response?.data?.error ||
          'ログインに失敗しました。メールアドレスとパスワードを確認してください。'
      );
    },
  });

  const registerMutation = useMutation<
    RegisterResponse,
    { response?: { data?: { error?: string } }; message: string },
    { username: string; email: string; password: string }
  >({
    mutationFn: async ({ username, email, password }) => {
      const response = await apiClient.post<RegisterResponse>(
        '/users/register',
        { username, email, password }
      );
      return response.data;
    },
    onSuccess: () => {
      setUsername('');
      setEmail('');
      setPassword('');
      setIsRegistering(false);
    },
    onError: (error) => {
      alert(
        error.response?.data?.error ||
          '登録に失敗しました。もう一度お試しください。'
      );
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ username, email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isRegistering ? '新規アカウント作成' : 'ログインページ'}
        </h1>
        {isRegistering ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ユーザー名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ユーザー名"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレス"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                登録
              </button>
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                ログイン画面に戻る
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレス"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                ログイン
              </button>
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                新規アカウント作成
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
