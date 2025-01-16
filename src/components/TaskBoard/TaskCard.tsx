import React from 'react';
import Image from 'next/image';

interface Task {
  id: number;
  title: string;
  status: string;
  assignedTo: {
    username: string;
    profileImage: string;
  };
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <h3 className="text-sm font-bold mb-2">{task.title}</h3>
      <div className="flex items-center">
        <Image
          src={task.assignedTo.profileImage || '/images/default-profile.png'}
          alt={task.assignedTo.username}
          width={24}
          height={24}
          className="rounded-full"
        />
        <span className="ml-2 text-sm text-gray-600">
          {task.assignedTo.username}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
