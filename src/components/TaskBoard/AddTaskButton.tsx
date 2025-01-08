// src/components/TaskBoard/AddTaskButton.tsx
//タスク追加用のボタンコンポーネント。
import React from "react";
import Image from "next/image";

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md"
    >
      <Image
        src="/icons/add-icon.png" // `public/icons` にアイコンを配置してください
        alt="Add Task"
        width={16}
        height={16}
      />
      <span className="ml-2 text-sm font-medium">Add Task</span>
    </button>
  );
};

export default AddTaskButton;
