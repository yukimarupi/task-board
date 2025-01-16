import React from 'react';
import Column from './Column';
import { useTask } from '@/hooks/useTask';

const TaskBoard: React.FC = () => {
  const { tasks = [], isLoading, error } = useTask(); // tasks のデフォルト値を空配列に設定

  // タスクを分類
  const columns = [
    {
      title: 'Backlog Tasks',
      tasks: tasks.filter((task) => task.status === 'backlog'),
    },
    {
      title: 'To Do Tasks',
      tasks: tasks.filter((task) => task.status === 'todo'),
    },
    {
      title: 'In Process',
      tasks: tasks.filter((task) => task.status === 'in_process'),
    },
    {
      title: 'Done',
      tasks: tasks.filter((task) => task.status === 'done'),
    },
  ];

  // ロード中の表示
  if (isLoading) {
    return <p className="text-center text-gray-500">タスクを読み込み中...</p>;
  }

  // エラー時の表示
  if (error) {
    return (
      <p className="text-center text-red-500">
        エラーが発生しました:{' '}
        {typeof error === 'string' ? error : '不明なエラー'}
      </p>
    );
  }

  // タスクが空の場合の表示
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">タスクがありません。</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {columns.map((column) => (
        <Column key={column.title} title={column.title} tasks={column.tasks} />
      ))}
    </div>
  );
};

export default TaskBoard;
