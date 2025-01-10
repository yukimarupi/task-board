//ボード全体、複数の列（Column）を表示。
import React from 'react';
import Column from './Column';

const TaskBoard: React.FC = () => {
  const data = [
    {
      title: 'Backlog Tasks',
      count: 5,
      tasks: [],
    },
    {
      title: 'To Do Tasks',

      tasks: [],
    },
    {
      title: 'In Process',
      count: 2,
      tasks: [],
    },
    {
      title: 'Done',
      count: 5,
      tasks: [],
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50">
      {data.map((column) => (
        <Column key={column.title} {...column} />
      ))}
    </div>
  );
};

export default TaskBoard;
