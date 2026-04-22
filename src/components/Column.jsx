import { useTask } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { FiPlus } from "react-icons/fi";

function Column({
  title,
  status,
  isDragging,
  setIsModalOpen,
  setEditingTask,
  setDefaultStatus,
}) {
  const { tasks } = useTask();

  const filteredTasks = tasks.filter(
    (task) => task.status === status
  );

  const { setNodeRef, isOver } =
    useDroppable({
      id: status,
    });

  const handleAdd = () => {
    setEditingTask(null);
    setDefaultStatus(status);
    setIsModalOpen(true);
  };

  const laneStyle = {
    todo:
      "bg-[#12182b]/90 border border-blue-400/15",

    doing:
      "bg-[#12182b]/90 border border-yellow-400/15",

    done:
      "bg-[#12182b]/90 border border-green-400/15",
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
          ? "ring-2 ring-violet-400 bg-violet-500/15 scale-[1.02] shadow-[0_0_50px_rgba(139,92,246,0.40)]"
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

      {/* Glow Drop Hint */}
      {isDragging && !isOver && (
        <div className="mb-4 rounded-2xl border border-violet-400/30 bg-white/5 px-4 py-3 text-center text-sm font-medium text-violet-200 relative z-10 shadow-[0_0_18px_rgba(168,85,247,0.45),0_0_35px_rgba(59,130,246,0.25)] animate-pulse">
          ✨ Drop here
        </div>
      )}

      {/* Strong Hover Glow */}
      {isDragging && isOver && (
        <div className="mb-4 rounded-2xl border-2 border-violet-400 bg-violet-500/20 px-4 py-4 text-center text-sm font-semibold text-violet-100 relative z-10 shadow-[0_0_22px_rgba(168,85,247,0.60),0_0_45px_rgba(59,130,246,0.35)] animate-pulse">
          Release to move to{" "}
          <strong className="text-white">
            {title}
          </strong>
        </div>
      )}

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
          <div
            className={`h-[520px] flex items-center justify-center rounded-2xl border-2 border-dashed text-sm font-medium transition-all duration-300 ${
              isOver
                ? "border-violet-400 text-violet-300 bg-violet-500/15"
                : "border-white/10 text-slate-500"
            }`}
          >
            {isOver
              ? `Release to move to ${title}`
              : "Drop tasks here"}
          </div>
        )}
      </div>
    </div>
  );
}

export default Column;