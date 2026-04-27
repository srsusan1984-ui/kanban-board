import {
  FiMenu,
  FiGrid,
  FiCheckSquare,
  FiUsers,
  FiSettings,
  FiZap,
} from "react-icons/fi";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activePage,
  setActivePage,
}) {
  const menu = [
    {
      icon: <FiGrid />,
      name: "Dashboard",
      key: "dashboard",
    },
    {
      icon: <FiCheckSquare />,
      name: "Tasks",
      key: "tasks",
    },
    {
      icon: <FiUsers />,
      name: "Team",
      key: "team",
    },
    {
      icon: <FiSettings />,
      name: "Settings",
      key: "settings",
    },
  ];

  return (
    <div
      className={`h-screen shrink-0 border-r border-white/5 bg-[#0f172a]/95 backdrop-blur-xl transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full flex flex-col p-4">

        {/* Top */}
        <div className="shrink-0">
          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="p-2 rounded-xl text-white hover:bg-white/10 transition"
          >
            <FiMenu size={20} />
          </button>

          {sidebarOpen && (
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-white">
              Kanban
            </h1>
          )}
        </div>

        {/* Nav */}
        <div className="mt-8 space-y-2 flex-1">
          {menu.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                setActivePage(item.key)
              }
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                activePage === item.key
                  ? "bg-violet-500/20 text-white border border-violet-400/20 shadow-[0_0_18px_rgba(139,92,246,0.25)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              {sidebarOpen && (
                <span className="font-medium">
                  {item.name}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bottom */}
        {sidebarOpen && (
          <div className="shrink-0">
            <div className="rounded-3xl p-4 border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-purple-500/10">
              
              <div className="flex items-center gap-2 text-violet-300">
                <FiZap />
                <span className="text-sm font-semibold">
                  Productivity
                </span>
              </div>

              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                Organize tasks faster and stay focused.
              </p>

              <button className="mt-4 w-full rounded-2xl bg-violet-500 hover:bg-violet-600 transition py-2.5 text-sm font-semibold text-white">
                Upgrade
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;