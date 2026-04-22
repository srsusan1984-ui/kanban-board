import {
  FiMenu,
  FiGrid,
  FiCheckSquare,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import SidebarExtras from "./SidebarExtras";

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
      className={`h-screen transition-all duration-300 border-r border-white/5 bg-[#0f172a]/90 backdrop-blur-xl ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Top */}
        <div>
          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="text-xl mb-6 p-2 rounded-xl hover:bg-white/10 transition"
          >
            <FiMenu />
          </button>

          {sidebarOpen && (
            <h1 className="text-2xl font-bold tracking-tight text-white mb-8">
              Kanban
            </h1>
          )}

          {/* Menu */}
          <div className="space-y-2">
            {menu.map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  setActivePage(item.key)
                }
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activePage === item.key
                    ? "bg-violet-500/20 text-white border border-violet-400/20"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
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

          {/* Sidebar Widgets */}
          {sidebarOpen && <SidebarExtras />}
        </div>

        {/* Bottom */}
        <div className="mt-auto">
          {sidebarOpen && (
            <div className="rounded-2xl p-4 bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-400/20">
              <p className="text-sm text-slate-300">
                Stay productive 🚀
              </p>

              <button className="mt-3 w-full bg-violet-500 hover:bg-violet-600 transition rounded-xl py-2 text-sm font-semibold">
                Upgrade
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;