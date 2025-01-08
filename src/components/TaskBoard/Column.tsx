// src/components/TaskBoard/Column.tsx

import React from "react";
import TaskCard from "./TaskCard";
import BoardHeader from "./BoardHeader";
import AddTaskButton from "./AddTaskButton";

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
  const handleAddTask = () => {
    // 新しいタスクを追加するロジックをここに実装します
    console.log(`Add task to ${title}`);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <BoardHeader title={title} count={count} />
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
      <AddTaskButton onClick={handleAddTask} />
    </div>
  );
};

export default Column;
