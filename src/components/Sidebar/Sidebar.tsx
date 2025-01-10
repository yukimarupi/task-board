import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileCard from "./ProfileCard";
import MenuItem from "./MenuItem";
import { useUser } from "../../context/UserContext"; // ユーザー情報のコンテキストをインポート

const Sidebar: React.FC = () => {
  const { user } = useUser(); // ログイン中のユーザー情報を取得

  const menuItems = [
    { name: "Inbox", count: 4, icon: "/icons/inbox.png", href: "/inbox" },
    { name: "Drive Files", count: 435, icon: "/icons/driveFiles.png", href: "/drive-files" },
    { name: "Boards", count: 5, icon: "/icons/Boards.png", href: "/boards" },
    { name: "Updates", count: 2, icon: "/icons/Updates.png", href: "/updates" },
    { name: "Analytics", count: 2, icon: "/icons/Znalytics.png", href: "/analytics" },
    { name: "CRM Dashboard", count: 2, icon: "/icons/CRM-Dashboard.png", href: "/crm-dashboard" },
    { name: "Ecommerce", count: null, icon: "/icons/Ecommerce.png", href: "/ecommerce" },
    { name: "Cryptocurrency", count: null, icon: "/icons/Cryptocurrency.png", href: "/cryptocurrency" },
    { name: "Projects", count: null, icon: "/icons/Projects.png", href: "/projects" },
    { name: "NFT Marketplace", count: null, icon: "/icons/NFT Marketplace.png", href: "/nft-marketplace" },
    { name: "Settings", count: 2, icon: "/icons/Settings.png", href: "/settings" },
  ];

  return (
    <div className="w-64 bg-gray-50 text-gray-800 h-screen p-4">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold">Dashboard</h2>
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
      {user && (
        <ProfileCard
          name={user.name}
          role={user.role}
          image={user.image}
        />
      )}

      {/* メニュー */}
      <ul className="space-y-6">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href}>
              <MenuItem name={item.name} count={item.count} icon={item.icon} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
