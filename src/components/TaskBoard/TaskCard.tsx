// src/components/TaskBoard/TaskCard.tsx

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
    dueDate, // 使用するプロパティ
  }) => {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h4 className="text-md font-semibold">{title}</h4>
        <p className="text-xs text-gray-500">{id}</p>
        <div className="flex flex-wrap space-x-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-medium rounded ${
                tag === "Design"
                  ? "bg-blue-100 text-blue-800"
                  : tag === "Development"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center mt-4">
          <div className="flex -space-x-2">
            {assignees.map((avatar, index) => (
              <div key={index} className="relative w-6 h-6">
                <Image
                  src={avatar}
                  alt={`Assignee ${index + 1}`}
                  layout="fill"
                  className="rounded-full border-2 border-white"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center ml-auto space-x-2 text-gray-500">
            <div className="flex items-center space-x-1">
              <Image
                src="/icons/attachment-icon.png" // アイコンを配置
                alt="Attachments"
                width={16}
                height={16}
              />
              <span className="text-xs">{attachments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Image
                src="/icons/comment-icon.png" // アイコンを配置
                alt="Comments"
                width={16}
                height={16}
              />
              <span className="text-xs">{comments}</span>
            </div>
          </div>
        </div>
        {/* 締め切り日の表示 */}
        <p className="text-xs text-gray-400 mt-2">{`Due: ${dueDate}`}</p>
      </div>
    );
  };



export default TaskCard;
