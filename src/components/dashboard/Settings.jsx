import { useTask } from "../../context/TaskContext";
import toast from "react-hot-toast";

function Settings() {
  const { tasks } = useTask();

  const total = tasks.length;

  const handleReset = () => {
    const confirmed = window.confirm(
      "Delete all saved tasks?"
    );

    if (!confirmed) return;

    localStorage.removeItem("tasks");
    window.location.reload();
  };

  const card =
    "rounded-3xl bg-[#11192d] border border-white/5 p-6";

  return (
    <div className="flex-1 overflow-auto p-8 space-y-6">
      {/* Header */}
      <div className="mb-2">
     <p className="text-sm text-slate-500">
       Team activity overview
       </p>
    </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={card}>
          <p className="text-slate-400 text-sm">
            Saved Tasks
          </p>

          <h2 className="text-3xl font-bold text-white mt-3">
            {total}
          </h2>
        </div>

        <div className={card}>
          <p className="text-slate-400 text-sm">
            Theme
          </p>

          <h2 className="text-2xl font-bold text-violet-400 mt-3">
            Dark Mode
          </h2>
        </div>

        <div className={card}>
          <p className="text-slate-400 text-sm">
            Version
          </p>

          <h2 className="text-2xl font-bold text-green-400 mt-3">
            v1.0
          </h2>
        </div>
      </div>

      {/* Preferences */}
      <div className={card}>
        <h2 className="text-xl font-semibold text-white">
          Preferences
        </h2>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-slate-300">
              Notifications
            </p>

            <span className="text-sm text-green-400">
              Enabled
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-slate-300">
              Auto Save
            </p>

            <span className="text-sm text-green-400">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-slate-300">
              Storage
            </p>

            <span className="text-sm text-slate-400">
              Local Browser
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-3xl bg-[#11192d] border border-red-500/20 p-6">
        <h2 className="text-xl font-semibold text-white">
          Danger Zone
        </h2>

        <p className="text-slate-400 mt-2 text-sm">
          Remove all locally saved tasks from this device.
        </p>

        <button
          onClick={handleReset}
          className="mt-5 bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-2xl font-semibold"
        >
          Reset All Tasks
        </button>
      </div>

      {/* Footer Card */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-purple-700 p-6">
        <h2 className="text-xl font-semibold">
          Built by Sudarshan 🚀
        </h2>

        <p className="text-white/80 mt-2 text-sm">
          Productivity app prototype with modern UI.
        </p>
      </div>
    </div>
  );
}

export default Settings;