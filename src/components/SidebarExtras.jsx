import { useTask } from "../context/TaskContext";

function SidebarExtras() {
  const { tasks } = useTask();

  const total = tasks.length;
  const completed = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const pending = total - completed;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="mt-8 space-y-4">
      {/* Stats */}
      <div className="bg-[#151d33] border border-white/5 rounded-2xl p-4">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
          Productivity
        </p>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-300">
            <span>Total Tasks</span>
            <span>{total}</span>
          </div>

          <div className="flex justify-between text-green-400">
            <span>Completed</span>
            <span>{completed}</span>
          </div>

          <div className="flex justify-between text-yellow-400">
            <span>Pending</span>
            <span>{pending}</span>
          </div>
        </div>
      </div>

      {/* Focus */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-4 shadow-lg">
        <p className="text-sm font-semibold">
          Stay Productive 🚀
        </p>

        <p className="text-xs text-white/80 mt-1">
          One task at a time.
        </p>
      </div>

      {/* Date */}
      <div className="bg-[#151d33] border border-white/5 rounded-2xl p-4">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
          Today
        </p>

        <p className="text-sm text-white font-medium">
          {today}
        </p>
      </div>
    </div>
  );
}

export default SidebarExtras;