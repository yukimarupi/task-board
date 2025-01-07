import React from "react";
import Image from "next/image";

const SubHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-gray-50 px-6 py-3 shadow-sm">
      {/* 左側のボタン */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-md">
          <Image
            src="/icons/1.png"
            alt="Board View"
            width={24}
            height={24}
          />
          <span className="text-sm font-semibold text-gray-700">
            Board View
          </span>
        </button>
        <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-md">
          <Image
            src="/icons/2.png"
            alt="List View"
            width={24}
            height={24}
          />
          <span className="text-sm font-semibold text-gray-700">List View</span>
        </button>
      </div>

      {/* 中央の項目 */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/icons/3.png"
            alt="Limited Access"
            width={16}
            height={16}
          />
          <span className="text-sm text-gray-500">Limited Access</span>
        </div>
        <div className="flex items-center space-x-2">
          <Image
            src="/icons/Twitter.png"
            alt="Twitter Team"
            width={16}
            height={16}
          />
          <span className="text-sm font-semibold text-gray-700">
            Twitter Team
          </span>
        </div>
      </div>

      {/* 右側の検索バーとアイコン */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search Tasks"
            className="px-4 py-2 text-sm focus:outline-none"
          />
          <button className="bg-gray-100 px-4">
            <Image
              src="/icons/4.png"
              alt="Search Icon"
              width={16}
              height={16}
            />
          </button>
        </div>
        <button>
          <Image
            src="/icons/5.png"
            alt="Task Icon"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
};

export default SubHeader;
