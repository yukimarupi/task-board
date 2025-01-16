import React from 'react';
import TaskCard from './TaskCard';

interface Task {
  id: number;
  title: string;
  status: string;
  assignedTo: {
    username: string;
    profileImage: string;
  };
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

const Column: React.FC<TaskColumnProps> = ({ title, tasks }) => {
  return (
    <div className="flex flex-col w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
