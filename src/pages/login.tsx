import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// 型定義
type LoginResponse = {
  user: {
    id: string;
    username: string;
    role: string;
    image?: string;
  };
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
  const [isRegistering, setIsRegistering] = useState(false); // 状態切り替え
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  // ログインミューテーション
  const loginMutation = useMutation<
    LoginResponse,
    Error,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      const response = await axios.post<LoginResponse>(
        'http://localhost:4000/api/users/login',
        { email, password }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log('ログイン成功:', data);
      setEmail('');
      setPassword('');
    },
    onError: (error) => {
      console.error('ログイン失敗:', error.message);
    },
  });

  // 新規登録ミューテーション
  const registerMutation = useMutation<
    RegisterResponse,
    Error,
    { username: string; email: string; password: string }
  >({
    mutationFn: async ({ username, email, password }) => {
      const response = await axios.post<RegisterResponse>(
        'http://localhost:4000/api/users/register',
        { username, email, password }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log('登録成功:', data);
      setUsername('');
      setEmail('');
      setPassword('');
    },
    onError: (error) => {
      console.error('登録失敗:', error.message);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      username,
      email,
      password,
    });
    registerMutation.mutate({ username, email, password });
  };

  return (
    <div>
      <h1>{isRegistering ? '新規アカウント作成' : 'ログインページ'}</h1>
      {isRegistering ? (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ユーザー名"
            autoComplete="username"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス"
            autoComplete="email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            autoComplete="new-password"
            required
          />
          <button type="submit">登録</button>
          <button type="button" onClick={() => setIsRegistering(false)}>
            ログイン画面に戻る
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            required
          />
          <button type="submit">ログイン</button>
          <button type="button" onClick={() => setIsRegistering(true)}>
            新規アカウント作成
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
