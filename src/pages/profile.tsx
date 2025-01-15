import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import apiClient from '@/lib/api'; // APIクライアントをインポート
import logout from '@/lib/logout'; // ログアウト関数
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // 初回レンダリング時にユーザー情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = sessionStorage.getItem('user');
      if (!storedUser) {
        console.error('ユーザー情報が見つかりません。');
        setLoading(false);
        return;
      }

      const userId = JSON.parse(storedUser).id;

      try {
        const response = await apiClient.get(`/users/${userId}`);
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

  // Cloudinaryに画像をアップロード

  const handleImageUpload = async (file: File): Promise<string> => {
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
    );

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Cloudinaryアップロードエラー: ${response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url; // アップロードされた画像のURL
    } catch (error) {
      console.error('画像アップロードエラー:', error);
      throw error;
    }
  };

  // ユーザー情報を保存
  const handleSave = async () => {
    const storedUser = sessionStorage.getItem('user');
    if (!storedUser) {
      alert('ユーザー情報が見つかりません。');
      return;
    }

    const userId = JSON.parse(storedUser).id;

    try {
      let uploadedImageUrl = profileImage;

      // 新しい画像が選択されている場合はCloudinaryにアップロード
      if (selectedFile) {
        uploadedImageUrl = await handleImageUpload(selectedFile);
      }

      const response = await apiClient.put(`/users/${userId}`, {
        username,
        email,
        profileImage: uploadedImageUrl,
      });

      const updatedUser: User = response.data;
      setUser(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error('ユーザー更新エラー:', error);
      alert('更新に失敗しました。');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (loading) {
    return <p>読み込み中...</p>;
  }

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
              プロフィール画像:
            </label>
            <input type="file" onChange={handleFileChange} />
            {selectedFile && (
              <p className="text-sm text-gray-600 mt-2">
                アップロード予定: {selectedFile.name}
              </p>
            )}
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
