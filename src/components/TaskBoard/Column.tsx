//  各列（Backlog、To Do、In Process、Done）を表し、その列内のタスクリストを管理。
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import BoardHeader from './BoardHeader';
import AddTaskButton from './AddTaskButton';
import AddTaskModal from './AddTaskModal';

interface Task {
  id: string;
  title: string;
  status: string;
  assignees: string[];
  comments: number;
  attachments: number;
  // tags: string[];
  dueDate: string;
}

interface ColumnProps {
  title: string;
  tasks: Task[];
  onAddTask: (task: Task) => void; // タスク追加のための関数
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onAddTask }) => {
  console.log('🚀 ~ Column tasks:', tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTaskSubmit = (newTask: { title: string; dueDate: string }) => {
    const newTaskData: Task = {
      id: `#${Math.random().toString(36).substr(2, 5)}`, // ランダムなID
      title: newTask.title,
      status: title,
      assignees: [],
      attachments: 0,
      comments: 0,
      dueDate: newTask.dueDate,
    };

    // タスクの追加を親コンポーネントに通知する
    onAddTask(newTaskData); // 親コンポーネントに通知
    setIsModalOpen(false); // モーダルを閉じる
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <BoardHeader title={title} count={tasks.length} />
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
      <AddTaskButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTaskSubmit}
          status={title}
        />
      )}
    </div>
  );
};

export default Column;
