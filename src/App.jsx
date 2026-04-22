import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import TaskModal from "./components/TaskModal";
import { Toaster } from "react-hot-toast";

import Dashboard from "./components/dashboard/Dashboard";
import Tasks from "./components/dashboard/Tasks";
import Team from "./components/dashboard/Team";
import Settings from "./components/dashboard/Settings";

function App() {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  const [defaultStatus, setDefaultStatus] =
    useState("todo");

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [activePage, setActivePage] =
    useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;

      case "tasks":
        return (
          <Tasks
            setIsModalOpen={setIsModalOpen}
            setEditingTask={setEditingTask}
            setDefaultStatus={setDefaultStatus}
          />
        );

      case "team":
        return <Team />;

      case "settings":
        return <Settings />;

      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-[#0b1120] text-white flex overflow-hidden">
      <Toaster position="bottom-center" />

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
       <Topbar
        setIsModalOpen={setIsModalOpen}
         setEditingTask={setEditingTask}
          activePage={activePage}
       />
        {renderPage()}
      </div>

      {isModalOpen && (
        <TaskModal
          setIsModalOpen={setIsModalOpen}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          defaultStatus={defaultStatus}
        />
      )}
    </div>
  );
}

export default App;