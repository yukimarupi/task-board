import React from "react";
import TaskCard from "./TaskCard";

interface ColumnProps {
  title: string;
  count: number;
  tasks: {
    id: string;
    title: string;
    status: string;
    assignees: string[];
    comments: number;
    attachments: number;
    tags: string[];
    dueDate: string;
  }[];
}

const Column: React.FC<ColumnProps> = ({ title, count, tasks }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">
        {title} <span className="text-gray-500">({count})</span>
      </h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
