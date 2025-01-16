import React, { useState } from 'react';
import Column from './Column';
import AddTaskButton from './AddTaskButton';
import AddTaskModal from './AddTaskModal';
import { useTask } from '@/hooks/useTask';

const TaskBoard: React.FC = () => {
  const { tasks = [], isLoading, error } = useTask(); // tasks のデフォルト値を空配列に設定
  const [showModal, setShowModal] = useState(false); // モーダルの表示状態
  const [status, setStatus] = useState<string>(''); // 選択されたステータスを追跡

  const handleAddTask = (newTask: {
    title: string;
    dueDate: string;
    tags: string[];
  }) => {
    // APIリクエストやタスク追加ロジックを実装
    console.log('新しいタスク:', newTask);
    setShowModal(false);
  };

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

  if (isLoading)
    return <p className="text-center text-gray-500">タスクを読み込み中...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">エラーが発生しました: {error}</p>
    );

  return (
    <div className="grid grid-cols-4 gap-6">
      {columns.map((column) => (
        <div key={column.title}>
          <Column title={column.title} tasks={column.tasks} />
          {/* 各カラムにタスク追加ボタンを配置 */}
          <AddTaskButton
            onClick={() => {
              setStatus(column.title.toLowerCase().replace(' ', '_')); // ステータスを設定
              setShowModal(true); // モーダルを開く
            }}
          />
        </div>
      ))}
      {/* モーダルを表示 */}
      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)} // モーダルを閉じる
          onSubmit={handleAddTask} // タスク追加処理
          status={status} // 選択されたステータスを渡す
        />
      )}
    </div>
  );
};

export default TaskBoard;
