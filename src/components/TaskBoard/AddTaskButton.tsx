import React from 'react';
import Image from 'next/image';

interface AddTaskButtonProps {
  onClick: () => void; // クリックイベントを受け取るプロパティ
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    >
      <Image
        src="/icons/add-icon.png" // アイコンのパスを確認してください
        alt="Add Task"
        width={20}
        height={20}
        className="mr-2"
      />
      <span className="text-sm font-medium">Add Task</span>
    </button>
  );
};

export default AddTaskButton;
