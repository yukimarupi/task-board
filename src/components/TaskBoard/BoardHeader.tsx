// src/components/TaskBoard/BoardHeader.tsx
//タスクボード全体のヘッダー部分。
import React from 'react';

interface BoardHeaderProps {
  title: string;
  count?: number;
}

const BoardHeader: React.FC<BoardHeaderProps> = ({ title, count }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {count !== undefined && (
        <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default BoardHeader;
