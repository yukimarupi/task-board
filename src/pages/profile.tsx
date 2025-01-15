import React, { useState, useEffect } from 'react';
import apiClient from '@/lib/api'; // apiClientをインポート
import Image from 'next/image';
import logout from '@/lib/logout'; // logout関数をインポート
import { useRouter } from 'next/router'; // ルーターをインポート

// ユーザー型を定義
interface User {
  id: number;
  username: string;
  email: string;
  profileImage?: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter(); // ルーターを初期化

  // 初回レンダリング時にユーザー情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = sessionStorage.getItem('user'); // セッションストレージからユーザー情報を取得
      if (!storedUser) {
        console.error('ユーザー情報が見つかりません。');
        setLoading(false);
        return;
      }

      const userId = JSON.parse(storedUser).id; // UserIdを取得

      try {
        const response = await apiClient.get(`/users/${userId}`); // apiClientを使用してリクエスト
        console.log('ユーザー情報:', response.data);

        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setProfileImage(response.data.profileImage || '');
      } catch (error) {
        console.error('ユーザー情報取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ユーザー情報を保存
  const handleSave = async () => {
    const storedUser = sessionStorage.getItem('user');
    if (!storedUser) {
      alert('ユーザー情報が見つかりません。');
      return;
    }

    const userId = JSON.parse(storedUser).id; // UserIdを取得

    try {
      const response = await apiClient.put(`/users/${userId}`, {
        username,
        email,
        profileImage,
      });

      const updatedUser: User = response.data;
      setUser(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error('ユーザー更新エラー:', error);
      alert('更新に失敗しました。');
    }
  };

  // ローディング中の表示
  if (loading) {
    return <p>読み込み中...</p>;
  }

  // ユーザー情報が取得できなかった場合
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">メールアドレス:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              プロフィール画像URL:
            </label>
            <input
              type="text"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
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
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-6">
            <Image
              src={user.profileImage || '/default-profile.png'}
              alt={user.username}
              width={96}
              height={96}
              className="rounded-full"
            />
            <div>
              <p className="text-xl font-bold">{user.username}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditMode(true);
              setUsername(user.username);
              setEmail(user.email);
              setProfileImage(user.profileImage || '');
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            編集
          </button>
        </div>
      )}

      {/* ログアウトボタン */}
      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        ログアウト
      </button>
      {/* ホームページに戻るボタン */}
      <button
        onClick={() => router.push('/')}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        ホームに戻る
      </button>
    </div>
  );
};

export default ProfilePage;
