// src/pages/dashboard.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <p>リダイレクト中...</p>;
  }

  return (
    <div>
      <h1>ダッシュボード</h1>
      <p>ようこそ、{user.name}さん</p>
    </div>
  );
};

export default Dashboard;
