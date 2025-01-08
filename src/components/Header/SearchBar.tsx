//検索バーのコンポーネント。
import React from "react";

const SearchBar: React.FC = () => {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search Tasks"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="absolute top-0 right-0 mt-2 mr-2">
        <span className="material-icons text-gray-600">search</span>
      </button>
    </div>
  );
};

export default SearchBar;
