import React from 'react';
import Image from 'next/image';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="p-4 bg-gray-100 rounded shadow flex flex-col space-y-2">
      {/* タスク名 */}
      <h3 className="text-sm font-bold">{task.taskName}</h3>

      {/* ステータス */}
      <p className="text-xs text-gray-600">ステータス: {task.status}</p>

      {/* 締め切り */}
      <p className="text-xs text-gray-600">
        期限: {new Date(task.dueDate).toLocaleDateString()}
      </p>

      {/* 割り当てられたユーザー */}
      <div className="flex items-center space-x-2 mt-2">
        <Image
          src={task.assignedTo?.profileImage || '/images/default-profile.png'}
          alt={task.assignedTo?.username || '未設定'}
          width={24}
          height={24}
          className="rounded-full"
        />
        <p className="text-xs text-gray-600">{task.assignedTo?.username}</p>
      </div>
    </div>
  );
};

export default TaskCard;
