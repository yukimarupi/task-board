import React, { useState } from "react";
import { useUser } from "../context/UserContext";

const ProfilePage = () => {
  const { user, setUser } = useUser();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [role, setRole] = useState(user?.role || "");
  const [image, setImage] = useState(user?.image || "");
  const [userId, setUserId] = useState(user?.id || "");

  const handleSave = () => {
    if (!name || !role || !userId) {
      alert("すべてのフィールドを入力してください。");
      return;
    }

    const updatedUser = { ...user, name, role, image, id: userId };
    setUser(updatedUser); // Contextのユーザー情報を更新
    setEditMode(false);
  };

  const handleCancel = () => {
    // 編集内容をリセット
    setName(user?.name || "");
    setRole(user?.role || "");
    setImage(user?.image || "");
    setUserId(user?.id || "");
    setEditMode(false);
  };

  if (!user) {
    return <p>ユーザー情報が見つかりません。</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">プロフィール</h1>
      {editMode ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">名前:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">役職:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">画像URL:</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">ユーザーID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              保存
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-6">
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <p className="text-xl font-bold">{user.name}</p>
              <p className="text-gray-600">{user.role}</p>
              <p className="text-sm text-gray-500">ID: {user.id}</p>
            </div>
          </div>
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            編集
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
