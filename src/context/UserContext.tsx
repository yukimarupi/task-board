import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// ユーザーの型定義
interface User {
  id: string;
  username: string;
  profileImage: string;
  role: string;
}

// コンテキストの型定義
interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

// コンテキストの初期化
const UserContext = createContext<UserContextProps | undefined>(undefined);

// プロバイダーの実装
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User | null>(null);

  // ローカルストレージに保存されたユーザー情報をロード
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // ユーザー情報を更新し、ローカルストレージにも保存
  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// カスタムフックの実装
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
