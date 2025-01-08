//サイドバーのメニュー
import React from "react";
import Image from "next/image";

interface MenuItemProps {
  name: string;
  count: number | null;
  icon: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, count, icon }) => {
  return (
    <li className="flex items-center space-x-4">
      {/* アイコン */}
      <div className="w-6 h-6 relative">
        <Image
          src={icon}
          alt={name}
          width={24}
          height={24}
          className="rounded"
        />
      </div>
      {/* 名前 */}
      <span className="flex-1">{name}</span>
      {/* カウント（あれば表示） */}
      {count !== null && (
        <span className="ml-auto bg-gray-200 text-xs font-bold rounded-full px-2 py-1 text-gray-800">
          {count}
        </span>
      )}
    </li>
  );
};

export default MenuItem;
