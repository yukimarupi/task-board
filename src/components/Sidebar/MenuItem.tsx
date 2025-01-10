import React from 'react';
import Image from 'next/image';

interface MenuItemProps {
  name: string;
  count: number | null;
  icon: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, count, icon }) => {
  return (
    <div className="flex items-center space-x-4">
      <Image src={icon} alt={name} width={24} height={24} />
      <span className="flex-1">{name}</span>
      {count !== null && <span className="text-sm text-gray-500">{count}</span>}
    </div>
  );
};

export default MenuItem;
