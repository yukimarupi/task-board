// src/pages/login.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";

const LoginPage: React.FC = () => {
  const { setUser } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ダミーデータ (実際の認証処理はAPIと連携)
    const dummyUser = {
      email: "nancy@example.com",
      password: "password123",
      name: "Nancy Martino",
      role: "Designer",
      image: "/images/profile.png",
    };

    if (email === dummyUser.email && password === dummyUser.password) {
      // ユーザー情報を設定
      setUser({
        id: "12345", // 初期値としてダミーIDを設定
        name: dummyUser.name,
        role: dummyUser.role,
        image: dummyUser.image,
      });
      router.push("/"); // ダッシュボードへ遷移
    } else {
      setError("メールアドレスまたはパスワードが間違っています。");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">ログイン</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="メールアドレスを入力"
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
