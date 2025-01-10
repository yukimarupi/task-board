// ボード全体、複数の列（Column）を表示。
import React, { useState } from 'react';
import Column from './Column';
import { Task, useTask } from '@/hooks/useTask';

const TaskBoard: React.FC = () => {
  const { tasks, isLoading, error } = useTask();
  const [allTasks, setAllTasks] = useState<Task[]>(tasks);

  // タスクを分類
  const columns = [
    {
      title: 'Backlog Tasks',
      tasks: allTasks.filter((task) => task.status === 'backlog'),
    },
    {
      title: 'To Do Tasks',
      tasks: allTasks.filter((task) => task.status === 'todo'),
    },
    {
      title: 'In Process',
      tasks: allTasks.filter((task) => task.status === 'in_process'),
    },
    {
      title: 'Done',
      tasks: allTasks.filter((task) => task.status === 'done'),
    },
  ];

  const addTask = (newTask: Task) => {
    setAllTasks((prevTasks) => [...prevTasks, newTask]);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50">
      {columns.map((column) => (
        <Column
          key={column.title}
          title={column.title}
          tasks={column.tasks}
          onAddTask={addTask} // 新しいタスクを追加
        />
      ))}
    </div>
  );
};

export default TaskBoard;
