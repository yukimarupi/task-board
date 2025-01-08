//タスクボード全体のメインコンポーネント。
import React from "react";
import Column from "./Column";

const TaskBoard: React.FC = () => {
  const data = [
    {
      title: "Backlog Tasks",
      count: 5,
      tasks: [
        {
          id: "#UI007",
          title: "Model Answer",
          status: "Backlog",
          assignees: ["/images/avatar1.png", "/images/avatar2.png"],
          comments: 2,
          attachments: 3,
          tags: ["Design", "Backlog"],
          dueDate: "2025-01-15",
        },
        {
          id: "#UI003",
          title: "Create calendar, chat and email app pages",
          status: "Backlog",
          assignees: ["/images/Avatar4.png", "/images/Avatar5.png"],
          comments: 4,
          attachments: 2,
          tags: ["Development", "Backlog"],
          dueDate: "2025-01-20",
        },
      ],
    },
    {
      title: "To Do Tasks",
      count: 3,
      tasks: [
        {
          id: "#UI005",
          title: "Model Answer",
          status: "To Do",
          assignees: ["/images/avatar1.png", "/images/avatar2.png"],
          comments: 4,
          attachments: 2,
          tags: ["To Do"],
          dueDate: "2025-01-18",
        },
        {
          id: "#UI008",
          title: "Add authentication pages",
          status: "To Do",
          assignees: ["/images/Avatar6.png"],
          comments: 2,
          attachments: 4,
          tags: ["To Do"],
          dueDate: "2025-01-19",
        },
      ],
    },
    {
      title: "In Process",
      count: 2,
      tasks: [
        {
          id: "#002",
          title: "Model Answer",
          status: "In Process",
          assignees: ["/images/avatar1.png", "/images/avatar2.png"],
          comments: 2,
          attachments: 4,
          tags: ["In Process"],
          dueDate: "2025-01-17",
        },
      ],
    },
    {
      title: "Done",
      count: 5,
      tasks: [
        {
          id: "#002",
          title: "Model Answer",
          status: "Done",
          assignees: ["/images/avatar1.png", "/images/avatar2.png"],
          comments: 2,
          attachments: 4,
          tags: ["Done"],
          dueDate: "2025-01-19",
        },
        {
          id: "#003",
          title: "Create calendar, chat and email app pages",
          status: "Done",
          assignees: ["/images/Avatar5.png"],
          comments: 2,
          attachments: 4,
          tags: ["Done"],
          dueDate: "2025-01-20",
        },
      ],
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
