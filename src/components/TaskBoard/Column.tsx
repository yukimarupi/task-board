import React from "react";

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
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold">{title}</h3>
      {count !== undefined && (
        <p className="text-sm text-gray-500">{`Tasks: ${count}`}</p>
      )}
      <div className="mt-4 space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-2 bg-gray-100 rounded shadow-sm">
            <h4 className="text-md font-bold">{task.title}</h4>
            <p className="text-sm text-gray-500">{task.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
