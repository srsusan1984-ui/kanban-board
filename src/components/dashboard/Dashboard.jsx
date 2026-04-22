import { useTask } from "../../context/TaskContext";

function Dashboard() {
  const { tasks } = useTask();

  const total = tasks.length;

  const todo = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const doing = tasks.filter(
    (task) => task.status === "doing"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const progress =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  const recentTasks = tasks.slice(-3).reverse();

  const cardBase =
    "rounded-3xl border border-white/5 p-6 bg-[#11192d] hover:-translate-y-1 hover:border-violet-400/20 transition-all duration-300";

  return (
    <div className="flex-1 overflow-auto p-8 space-y-6">
      {/* Intro */}
      <div>
        <p className="text-sm text-violet-400 font-medium">
          {greeting}
        </p>

        <p className="text-slate-400 mt-2">
          Here's your live productivity overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className={cardBase}>
          <p className="text-slate-400 text-sm">
            Total Tasks
          </p>

          <h2 className="text-3xl font-bold mt-3 text-white">
            {total}
          </h2>
        </div>

        <div className={cardBase}>
          <p className="text-slate-400 text-sm">
            To Do
          </p>

          <h2 className="text-3xl font-bold mt-3 text-blue-400">
            {todo}
          </h2>
        </div>

        <div className={cardBase}>
          <p className="text-slate-400 text-sm">
            In Progress
          </p>

          <h2 className="text-3xl font-bold mt-3 text-yellow-400">
            {doing}
          </h2>
        </div>

        <div className={cardBase}>
          <p className="text-slate-400 text-sm">
            Completed
          </p>

          <h2 className="text-3xl font-bold mt-3 text-green-400">
            {completed}
          </h2>
        </div>
      </div>

      {/* Progress */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-3xl bg-[#11192d] border border-white/5 p-6">
          <div className="flex justify-between mb-4">
            <p className="text-slate-400 text-sm">
              Productivity Progress
            </p>

            <p className="text-white text-sm font-medium">
              {progress}%
            </p>
          </div>

          <div className="w-full h-3 bg-[#1e293b] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="text-xs text-slate-500 mt-3">
            Complete more tasks to increase progress.
          </p>
        </div>

        <div className="rounded-3xl bg-[#11192d] border border-white/5 p-6 flex flex-col items-center justify-center">
          <div className="w-28 h-28 rounded-full border-[8px] border-violet-500 flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_30px_rgba(139,92,246,0.25)]">
            {progress}%
          </div>

          <p className="text-slate-400 text-sm mt-4">
            Completion Rate
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-[#11192d] border border-white/5 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Tasks
          </h2>

          <div className="space-y-3">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-2xl bg-white/5 px-4 py-3"
                >
                  <p className="text-white text-sm font-medium">
                    {task.title}
                  </p>

                  <p className="text-slate-400 text-xs mt-1 capitalize">
                    {task.status}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">
                No tasks yet.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-purple-700 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold">
            Keep Going 🚀
          </h2>

          <p className="text-white/80 mt-3 text-sm leading-relaxed">
            Small progress every day leads to
            massive success over time.
          </p>

          <div className="mt-5 text-sm bg-white/10 rounded-2xl px-4 py-3">
            Focus today: Finish your highest
            priority task.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;