import React from "react";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: "Inbox", count: 4, icon: "/icons/inbox.png" },
    { name: "Drive Files", count: 435, icon: "/icons/driveFiles.png" },
    { name: "Boards", count: 5, icon: "/icons/Boards.png" },
    { name: "Updates", count: 2, icon: "/icons/Updates.png" },
    { name: "Analytics", count: 2, icon: "/icons/Znalytics.png" },
    { name: "CRM Dashboard", count: 2, icon: "/icons/CRM-Dashboard.png" },
    { name: "Ecommerce", count: null, icon: "/icons/Ecommerce.png" },
    { name: "Cryptocurrency", count: null, icon: "/icons/Cryptocurrency.png" },
    { name: "Projects", count: null, icon: "/icons/Projects.png" },
    { name: "NFT Marketplace", count: null, icon: "/icons/NFT Marketplace.png" },
    { name: "Settings", count: 2, icon: "/icons/Settings.png" },
  ];

  return (
    <div className="w-64 bg-gray-50 text-gray-800 h-screen p-4">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-8">
        {/* Dashboard Text */}
        <h2 className="text-xl font-bold">Dashboard</h2>
        {/* Hamburger Menu Icon */}
        <div className="w-6 h-6">
          <Image
            src="/icons/HamburgerButton.png" // ハンバーガーメニューアイコンのパス
            alt="Hamburger Menu"
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* ユーザー情報 */}
      <div className="flex items-center mb-8">
        <Image
          src="/images/profile.png" // プロフィール画像のパス
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-4">
          <h3 className="text-sm font-bold">Nancy Martino</h3>
          <p className="text-xs text-gray-500">Designer</p>
        </div>
      </div>

      {/* メニュー */}
      <ul className="space-y-6">
        {menuItems.map((item) => (
          <li key={item.name} className="flex items-center space-x-4">
            {/* アイコン */}
            <div className="w-6 h-6 relative">
              <Image
                src={item.icon}
                alt={item.name}
                width={24}
                height={24}
                className="rounded"
              />
            </div>
            {/* 名前 */}
            <span className="flex-1">{item.name}</span>
            {/* カウント（あれば表示） */}
            {item.count !== null && (
              <span className="ml-auto bg-gray-200 text-xs font-bold rounded-full px-2 py-1 text-gray-800">
                {item.count}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
