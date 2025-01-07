import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import TaskBoard from "../components/TaskBoard/TaskBoard";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4">
          <TaskBoard />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
