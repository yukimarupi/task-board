//トップページ、表示される画面
import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import TaskBoard from '../components/TaskBoard/TaskBoard';
import TabHeader from '@/components/Header/TabHeader';
import SubHeader from '@/components/Header/SubHeader';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4">
          <TabHeader />
          <SubHeader />
          <TaskBoard />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
