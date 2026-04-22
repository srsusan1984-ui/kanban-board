import { useTask } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { FiPlus } from "react-icons/fi";

function Column({
  title,
  status,
  setIsModalOpen,
  setEditingTask,
  setDefaultStatus,
}) {
  const { tasks } = useTask();

  const filteredTasks = tasks.filter(
    (task) => task.status === status
  );

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const handleAdd = () => {
    setEditingTask(null);
    setDefaultStatus(status);
    setIsModalOpen(true);
  };

  const laneStyle = {
    todo:
      "bg-[#12182b]/90 border border-blue-400/10",
    doing:
      "bg-[#12182b]/90 border border-yellow-400/10",
    done:
      "bg-[#12182b]/90 border border-green-400/10",
  };

  const accentBar = {
    todo: "bg-blue-500",
    doing: "bg-yellow-500",
    done: "bg-green-500",
  };

  return (
    <div
      ref={setNodeRef}
      className={`rounded-3xl p-5 min-h-[640px] relative overflow-hidden backdrop-blur-xl transition-all duration-200 ${
        laneStyle[status]
      } ${
        isOver
          ? "ring-2 ring-violet-500/40 scale-[1.01]"
          : ""
      }`}
    >
      {/* Top Accent */}
      <div
        className={`absolute top-0 left-0 w-full h-1 rounded-t-3xl ${
          accentBar[status]
        }`}
      />

      {/* Header */}
      <div className="flex items-center mb-5 pt-1 relative z-10">
        <h2 className="font-semibold text-lg text-white tracking-tight">
          {title}
        </h2>

        <button
          onClick={handleAdd}
          className="ml-3 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
        >
          <FiPlus size={16} />
        </button>

        <span className="ml-auto text-sm text-slate-500 font-medium">
          {filteredTasks.length}
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-4 relative z-10">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              setIsModalOpen={setIsModalOpen}
              setEditingTask={setEditingTask}
            />
          ))
        ) : (
          <div className="h-[520px] flex items-center justify-center rounded-2xl border border-dashed border-white/5 text-slate-500 text-sm">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}

export default Column;