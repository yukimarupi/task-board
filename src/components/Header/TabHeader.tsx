import React from "react";
import Image from "next/image";

const TabHeader: React.FC = () => {
  const tabs = ["Timeline", "Calendar", "Dashboard", "Progress", "Forms", "More"];
  const teamMembers = [
    "/images/avatar1.png",
    "/images/avatar2.png",
    "/images/avatar6.png",
    "/images/avatar4.png",
  ];

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-gray-50 shadow-sm">
      {/* タブメニュー */}
      <div className="flex space-x-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${
              tab === "Timeline"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            } px-2 py-1 font-semibold`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* チームメンバー */}
      <div className="flex items-center -space-x-2">
        {teamMembers.map((src, index) => (
          <div key={index} className="relative w-8 h-8">
            <Image
              src={src}
              alt={`Team Member ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-full border-2 border-white"
            />
          </div>
        ))}
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-sm text-gray-500">
          +5
        </div>
      </div>
    </div>
  );
};

export default TabHeader;
