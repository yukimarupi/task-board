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
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h4 className="text-md font-bold">{title}</h4>
      <p className="text-xs text-gray-500">{id}</p>
      <div className="flex space-x-2 mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs font-bold rounded-full bg-${
              tag === "Backlog" ? "yellow-100 text-yellow-800" : ""
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center space-x-2 mt-2">
        {assignees.map((avatar, index) => (
          <Image
            key={index}
            src={avatar}
            alt="Avatar"
            width={24}
            height={24}
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
