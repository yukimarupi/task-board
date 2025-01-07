import React from "react";
import Image from "next/image";

interface TaskCardProps {
  id: string;
  title: string;
  status: string;
  assignees: string[];
  comments: number;
  attachments: number;
  tags: string[];
  dueDate: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  assignees,
  comments,
  attachments,
  tags,
  dueDate,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h4 className="text-md font-bold">{title}</h4>
      <p className="text-xs text-gray-500">{id}</p>
      <div className="flex space-x-2 mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs font-bold rounded-full ${
              tag === "Backlog"
                ? "bg-yellow-100 text-yellow-800"
                : tag === "To Do"
                ? "bg-pink-100 text-pink-800"
                : tag === "In Process"
                ? "bg-purple-100 text-purple-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center mt-2">
        {assignees.map((avatar, index) => (
          <Image
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            width={32}
            height={32}
            className="rounded-full"
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-4">
        <span>{attachments} attachments</span>
        <span>{comments} comments</span>
      </div>
      <p className="text-xs text-gray-400 mt-2">Due: {dueDate}</p>
    </div>
  );
};

export default TaskCard;
