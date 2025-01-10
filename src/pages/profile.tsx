import React from "react";
import { useUser } from "../context/UserContext";

const ProfilePage = () => {
  const { user } = useUser();

  if (!user) {
    return <p>ユーザー情報が見つかりません。</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">プロフィール</h1>
      <div className="flex items-center space-x-6">
        <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full" />
        <div>
          <p className="text-xl font-bold">{user.name}</p>
          <p className="text-gray-600">{user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
