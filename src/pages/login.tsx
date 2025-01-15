import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router'; // 修正ポイント
import apiClient from '@/lib/api'; // 修正ポイント

// 型定義
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
  const router = useRouter(); // 修正ポイント
  const [isRegistering, setIsRegistering] = useState(false); // 状態切り替え
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  // ログインミューテーション
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
      console.log('ログイン成功:', data);

      // トークンとユーザー情報をセッションストレージに保存
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));

      // 入力フィールドをリセット
      setEmail('');
      setPassword('');

      // ホームページにリダイレクト
      router.push('/');
    },
    onError: (error) => {
      console.error('ログイン失敗:', error.response?.data || error.message);
      alert(
        error.response?.data?.error ||
          'ログインに失敗しました。メールアドレスとパスワードを確認してください。'
      );
    },
  });

  // 新規登録ミューテーション
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
    onSuccess: (data) => {
      console.log('登録成功:', data);

      // 入力フィールドをリセット
      setUsername('');
      setEmail('');
      setPassword('');

      // ログイン画面に戻す
      setIsRegistering(false);
    },
    onError: (error) => {
      console.error('登録失敗:', error.response?.data || error.message);
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
            autoComplete="email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            autoComplete="current-password"
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
