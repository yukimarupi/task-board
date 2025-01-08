//通知アイコン部分を管理。
import React from "react";
import Image from "next/image";

const NotificationIcons: React.FC = () => {
  return (
    <div className="flex items-center space-x-6">
      {/* 通知アイコン */}
      <button className="relative">
        <span className="material-icons text-gray-600 text-2xl">notifications</span>
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
          2
        </span>
      </button>

      {/* プロフィール画像 */}
      <div className="w-10 h-10">
        <Image
          src="/profile.png"
          alt="User Profile"
          width={40} // 必要に応じて変更可能
          height={40}
          className="rounded-full border border-gray-300"
        />
      </div>
    </div>
  );
};

export default NotificationIcons;
