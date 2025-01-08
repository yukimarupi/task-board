import React from "react";
import TaskCard from "./TaskCard";

interface ColumnProps {
  title: string;
  count?: number;
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
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{title}</h3>
        {count && (
          <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
            {count}
          </span>
        )}
      </div>
      <div className="mt-4 space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
