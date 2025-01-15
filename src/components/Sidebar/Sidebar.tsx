import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MenuItem from './MenuItem';
import apiClient from '@/lib/api'; // APIクライアントをインポート

interface User {
  id: number;
  username: string;
  profileImage?: string;
  role?: string;
}

const Sidebar: React.FC = () => {
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

  const menuItems = [
    { name: 'Inbox', count: 4, icon: '/icons/inbox.svg', href: '/inbox' },
    {
      name: 'Drive Files',
      count: 435,
      icon: '/icons/driveFiles.png',
      href: '/drive-files',
    },
    { name: 'Boards', count: 5, icon: '/icons/Boards.png', href: '/boards' },
    { name: 'Updates', count: 2, icon: '/icons/Updates.png', href: '/updates' },
    {
      name: 'Analytics',
      count: 2,
      icon: '/icons/Znalytics.png',
      href: '/analytics',
    },
    {
      name: 'CRM Dashboard',
      count: 2,
      icon: '/icons/CRM-Dashboard.png',
      href: '/crm-dashboard',
    },
    {
      name: 'Ecommerce',
      count: null,
      icon: '/icons/Ecommerce.png',
      href: '/ecommerce',
    },
    {
      name: 'Cryptocurrency',
      count: null,
      icon: '/icons/Cryptocurrency.png',
      href: '/cryptocurrency',
    },
    {
      name: 'Projects',
      count: null,
      icon: '/icons/Projects.png',
      href: '/projects',
    },
    {
      name: 'NFT Marketplace',
      count: null,
      icon: '/icons/NFT Marketplace.png',
      href: '/nft-marketplace',
    },
    {
      name: 'Settings',
      count: 2,
      icon: '/icons/Settings.png',
      href: '/settings',
    },
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

      {/* プロフィール情報 */}
      {user ? (
        <div className="flex items-center mb-8">
          <Image
            src={user.profileImage || '/images/default-profile.png'} // プロフィール画像（デフォルト画像を設定）
            alt={user.username}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-4">
            <h3 className="text-sm font-bold">{user.username}</h3>
            <p className="text-xs text-gray-500">{user.role || '未設定'}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mb-6">ユーザー情報を取得中...</p>
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
