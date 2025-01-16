import React, { useState } from 'react';
import axios from 'axios';
import Column from './Column';
import AddTaskButton from './AddTaskButton';
import AddTaskModal from './AddTaskModal';
import { useTask } from '@/hooks/useTask';
import { API_BASE_URL } from '@/utils/constant';

const TaskBoard: React.FC = () => {
  const { tasks = [], isLoading, error } = useTask(); // tasks のデフォルト値を空配列に設定
  const [showModal, setShowModal] = useState(false); // モーダルの表示状態
  const [status, setStatus] = useState<string>(''); // 選択されたステータスを追跡
  const [message, setMessage] = useState<string | null>(null); // フィードバックメッセージ

  // モーダルを開く処理
  const openModal = (status: string) => {
    setStatus(status);
    setShowModal(true);
  };

  // タスク追加処理
  const handleAddTask = async (newTask: {
    title: string;
    dueDate: string;
    tags: string[];
  }) => {
    try {
      // タスク追加用APIリクエスト
      const response = await axios.post(`${API_BASE_URL}/api/tasks`, {
        taskName: newTask.title,
        status,
        dueDate: newTask.dueDate,
        tags: newTask.tags,
        createdBy: 1, // 仮のデータ: ユーザーID
        assignedTo: 1, // 仮のデータ: 割り当て先ユーザーID
      });

      // 成功時のフィードバック
      setMessage('タスクが正常に作成されました');
      console.log('新しいタスク:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // エラー時の詳細なメッセージ
        setMessage(
          `エラーが発生しました: ${error.response?.data?.error || error.message}`
        );
      } else {
        setMessage('予期しないエラーが発生しました。');
      }
      console.error('タスク作成中にエラーが発生しました:', error);
    } finally {
      setShowModal(false); // モーダルを閉じる
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">タスクを読み込み中...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        エラーが発生しました:{' '}
        {typeof error === 'string' ? error : '不明なエラー'}
      </p>
    );
  }

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

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* フィードバックメッセージの表示 */}
      {message && <p className="text-center text-green-500">{message}</p>}

      {columns.map((column) => (
        <div key={column.title}>
          <Column title={column.title} tasks={column.tasks} />
          {/* 各カラムにタスク追加ボタンを配置 */}
          <AddTaskButton
            onClick={() =>
              openModal(column.title.toLowerCase().replace(' ', '_'))
            }
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
