//  各列（Backlog、To Do、In Process、Done）を表し、その列内のタスクリストを管理。
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import BoardHeader from './BoardHeader';
import AddTaskButton from './AddTaskButton';
import AddTaskModal from './AddTaskModal';

interface ColumnProps {
  title: string;
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

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState(tasks); // タスクリストを状態で管理

  const handleAddTask = () => {
    setIsModalOpen(true); // モーダルを開く
  };

  const handleAddTaskSubmit = (newTask: { title: string; dueDate: string }) => {
    const newTaskData = {
      id: `#${Math.random().toString(36).substr(2, 5)}`, // ランダムなID
      title: newTask.title,
      status: title,
      assignees: [],
      comments: 0,
      attachments: 0,
      tags: [title],
      dueDate: newTask.dueDate,
    };

    setTaskList((prev) => [...prev, newTaskData]); // 新しいタスクをリストに追加
    setIsModalOpen(false); // モーダルを閉じる
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <BoardHeader title={title} count={taskList.length} />
      <div className="space-y-4">
        {taskList.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
      <AddTaskButton onClick={handleAddTask} />
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
