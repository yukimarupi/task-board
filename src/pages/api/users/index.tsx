// src/pages/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../../../context/UserContext';


const LoginPage: React.FC = () => {
  const { setUser } = useUser();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          id: data.user.id,
          name: data.user.username,
          role: 'Designer', // 必要に応じて変更
          image: data.user.profileImage,
        });
        router.push('/'); // ダッシュボードなどの遷移先
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'ログインに失敗しました。');
      }
    } catch (error) {
      setError('サーバーエラーが発生しました。');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">ログイン</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">ユーザー名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="ユーザー名を入力"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="パスワードを入力"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
