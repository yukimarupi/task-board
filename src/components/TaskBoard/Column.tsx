import React from 'react';
import TaskCard from './TaskCard';
import { Task } from '@/types/task';

interface ColumnProps {
  title: string;
  tasks: Task[]; // 必須
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
