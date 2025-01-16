import React from 'react';
import TaskBoard from '@/components/TaskBoard/TaskBoard';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <p>リダイレクト中...</p>;
  }

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">タスクボード</h1>
      <TaskBoard />
    </div>
  );
};

export default Dashboard;
