import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string; // ユーザーIDを追加
  name: string;
  role: string;
  image: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: '12345', // 初期値としてダミーIDを設定
    name: 'Nancy Martino',
    role: 'Designer',
    image: '/images/profile.svg',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
