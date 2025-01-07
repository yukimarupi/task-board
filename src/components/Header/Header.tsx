import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center bg-gray-100 px-6 py-4 shadow-sm">
      {/* 左側: 検索バー */}
      <div className="flex items-center space-x-4">
        {/* 検索アイコン */}
        <div className="relative w-6 h-6">
          <Image
            src="/icons/Header/vector.png" // 修正済みファイル名
            alt="Search"
            width={24}
            height={24}
          />
        </div>
        {/* 検索バー */}
        <input
          type="text"
          placeholder="Search Tasks"
          className="border px-4 py-2 rounded-lg w-full max-w-md"
        />
        {/* 音声アイコン */}
        <div className="relative w-6 h-6">
          <Image
            src="/icons/Header/keyboard_voice.png" // 修正済みファイル名
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
        {/* フォルダアイコン */}
        <div className="relative w-6 h-6">
          <Image
            src="/icons/Header/vector_1.png" // 修正済みファイル名
            alt="Folder"
            width={24}
            height={24}
          />
        </div>
        {/* 通知アイコン */}
        <div className="relative w-6 h-6">
          <Image
            src="/icons/Header/vector_2.png" // 修正済みファイル名
            alt="Notifications"
            width={24}
            height={24}
          />
          {/* 通知バッジ */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </div>
        {/* プロフィール画像 */}
        <div className="relative w-8 h-8">
          <Image
            src="/images/profile.png" // 修正済みファイル名
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
