import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import apiClient from '@/lib/api'; // APIクライアントをインポート

interface User {
  id: number;
  username: string;
  profileImage?: string;
  role?: string;
}

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // 初回レンダリング時にユーザー情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = sessionStorage.getItem('user'); // セッションストレージからユーザー情報を取得
      if (!storedUser) {
        console.error('ユーザー情報が見つかりません。');
        return;
      }

      const userId = JSON.parse(storedUser).id; // UserIDを取得

      try {
        const response = await apiClient.get(`/users/${userId}`); // APIリクエストでユーザー情報を取得
        setUser(response.data);
      } catch (error) {
        console.error('ユーザー情報取得エラー:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="flex justify-between items-center bg-gray-100 px-6 py-4 shadow-sm">
      {/* 左側: 検索バー */}
      <div className="flex items-center space-x-4">
        <div className="relative w-6 h-6">
          <Image
            src="/icons/Header/vector_3.png"
            alt="Search"
            width={24}
            height={24}
          />
        </div>
        <input
          type="text"
          placeholder="Search Tasks"
          className="border px-4 py-2 rounded-lg w-full max-w-md"
        />
        <div className="relative w-6 h-6">
          <Image
            src="/icons/Header/keyboard_voice.png"
            alt="Voice"
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* 中央: メニューリンク */}
      <nav className="flex items-center space-x-6 text-gray-700">
        <a href="#" className="hover:text-gray-900">
          Dashboard
        </a>
        <a href="#" className="hover:text-gray-900">
          My Tasks
        </a>
        <a href="#" className="hover:text-gray-900">
          Reporting
        </a>
        <a href="#" className="hover:text-gray-900">
          Portfolios
        </a>
        <a href="#" className="hover:text-gray-900">
          Goals
        </a>
      </nav>

      {/* 右側: 通知アイコンとプロフィール */}
      <div className="flex items-center space-x-6">
        <div className="relative w-6 h-6">
          <Image
            src="/icons/Header/vector_1.png"
            alt="Folder"
            width={24}
            height={24}
          />
        </div>
        <div className="relative w-6 h-6">
          <Image
            src="/icons/Header/bel.png"
            alt="Notifications"
            width={24}
            height={24}
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </div>
        {/* プロフィール画像 */}
        <div className="relative w-8 h-8">
          {user ? (
            <Link href="/profile">
              <Image
                src={user.profileImage || '/images/default-profile.png'}
                alt={user.username}
                width={32}
                height={32}
                className="rounded-full cursor-pointer object-cover"
              />
            </Link>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
