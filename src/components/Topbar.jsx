function Topbar({
  setIsModalOpen,
  setEditingTask,
  activePage,
}) {
  const handleOpen = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const pageContent = {
    dashboard: {
      title: "Dashboard Overview",
      subtitle:
        "Track progress and monitor productivity.",
    },

    tasks: {
      title: "Task Workspace",
      subtitle:
        "Manage your workflow efficiently.",
    },

    team: {
      title: "Prototype Team Dashboard",
      subtitle:
        "No real-time backend connected.",
    },

    settings: {
      title: "Settings Center",
      subtitle:
        "Preview controls and local preferences.",
    },
  };

  const current =
    pageContent[activePage] ||
    pageContent.dashboard;

  return (
    <div className="h-20 px-8 border-b border-white/5 bg-[#0b1020]/70 backdrop-blur-xl flex items-center justify-between shrink-0">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {current.title}
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          {current.subtitle}
        </p>
      </div>

      <button
        onClick={handleOpen}
        className="px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-violet-500 to-purple-600 hover:scale-105 hover:shadow-[0_8px_30px_rgba(139,92,246,0.35)] transition-all duration-300"
      >
        + Add Task
      </button>
    </div>
  );
}

export default Topbar;