import React, { useState } from 'react';
import axios from 'axios';

const UserForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/api/users', { username, profileImage }); // responseを削除
      setMessage('ユーザーが作成されました');
      setUsername('');
      setProfileImage('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // AxiosErrorの場合に詳細なメッセージを設定
        setMessage(
          `エラーが発生しました: ${error.response?.data?.error || error.message}`
        );
      } else {
        // その他のエラー
        setMessage('予期しないエラーが発生しました。');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-bold mb-4">ユーザー作成</h2>
      {message && <p className="text-sm mb-4">{message}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">ユーザー名</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="ユーザー名を入力"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          プロフィール画像URL
        </label>
        <input
          type="text"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="画像URLを入力"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        作成
      </button>
    </form>
  );
};

export default UserForm;
