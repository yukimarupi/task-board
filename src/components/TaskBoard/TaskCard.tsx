import React from 'react';
import Image from 'next/image';

// 日付をフォーマットする関数
const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

interface TaskCardProps {
  id: string;
  title: string;
  status: string;
  assignees: string[];
  comments: number;
  attachments: number;
  // tags: string[];
  dueDate: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  assignees,
  comments,
  attachments,
  // tags,
  dueDate,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h4 className="text-md font-semibold">{title}</h4>
      <p className="text-xs text-gray-500">{id}</p>
      <div className="flex flex-wrap space-x-2 mt-2">
        {/* {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs font-medium rounded ${
              tag === 'Design'
                ? 'bg-blue-100 text-blue-800'
                : tag === 'Development'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
            }`}
          >
            {tag}
          </span>
        ))} */}
      </div>
      <div className="flex items-center mt-4">
        <div className="flex -space-x-2">
          {assignees.map((avatar, index) => (
            <div key={index} className="relative w-6 h-6">
              <Image
                src={avatar || '/images/default-avatar.png'}
                alt={`Assignee ${index + 1}`}
                layout="fill"
                className="rounded-full border-2 border-white"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center ml-auto space-x-2 text-gray-500">
          <div className="flex items-center space-x-1" title="Attachments">
            <Image
              src="/icons/attachment-icon.png"
              alt="Attachments"
              width={16}
              height={16}
            />
            <span className="text-xs">{attachments}</span>
          </div>
          <div className="flex items-center space-x-1" title="Comments">
            <Image
              src="/icons/comment-icon.png"
              alt="Comments"
              width={16}
              height={16}
            />
            <span className="text-xs">{comments}</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">{`Due: ${formatDate(dueDate)}`}</p>
    </div>
  );
};

export default TaskCard;
