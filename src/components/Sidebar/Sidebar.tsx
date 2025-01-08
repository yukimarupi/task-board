//サイドバーをMenuItem と ProfileCarを使用して表示
import React from "react";
import Image from "next/image";
import MenuItem from "./MenuItem";
import ProfileCard from "./ProfileCard";

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
            src="/icons/HamburgerButton.png"
            alt="Hamburger Menu"
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* プロフィール */}
      <ProfileCard
        name="Nancy Martino"
        role="Designer"
        image="/images/profile.png"
      />

      {/* メニュー */}
      <ul className="space-y-6">
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            name={item.name}
            count={item.count}
            icon={item.icon}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
