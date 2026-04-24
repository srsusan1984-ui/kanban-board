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
      className={`rounded-3xl p-5 h-full min-h-0 relative overflow-hidden backdrop-blur-xl transition-all duration-200 flex flex-col ${
        laneStyle[status]
      }

      ${
        isDragging && !isOver
          ? "ring-2 ring-violet-400/60 border-violet-400/40 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.25)]"
          : ""
      }

      ${
        isDragging && isOver
          ? "ring-4 ring-violet-300 border-violet-300 bg-violet-500/20 scale-[1.02] shadow-[0_0_55px_rgba(168,85,247,0.55)]"
          : ""
      }
      `}
    >
      {/* Top Accent */}
      <div
        className={`absolute top-0 left-0 w-full h-1 rounded-t-3xl ${
          accentBar[status]
        }`}
      />

      {/* Header */}
      <div className="flex items-center mb-5 pt-1 relative z-10 shrink-0">
        <h2 className="font-semibold text-lg text-white tracking-tight">
          {title}
        </h2>

        <button
          onClick={handleAdd}
          className="ml-3 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
        >
          <FiPlus size={16} />
        </button>

        <span className="ml-auto text-sm text-slate-400 font-medium">
          {filteredTasks.length}
        </span>
      </div>

      {/* Drag Start = all columns active */}
      {isDragging && !isOver && (
        <div className="mb-4 rounded-2xl border border-violet-300/40 bg-violet-500/10 px-4 py-3 text-center text-sm font-semibold text-violet-100 relative z-10 shadow-[0_0_20px_rgba(168,85,247,0.45)] animate-pulse shrink-0">
          ✨ Drop here
        </div>
      )}

      {/* Hovered column = strongest */}
      {isDragging && isOver && (
        <div className="mb-4 rounded-2xl border-2 border-violet-300 bg-violet-500/20 px-4 py-4 text-center text-sm font-bold text-white relative z-10 shadow-[0_0_30px_rgba(168,85,247,0.65)] animate-pulse shrink-0">
          🚀 Release to move to {title}
        </div>
      )}

      {/* Cards Area Wrapper */}
      <div className="flex-1 min-h-0 relative z-10 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden pr-1 space-y-4 scroll-smooth no-scrollbar">
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
              className={`h-full min-h-[320px] flex items-center justify-center rounded-2xl border-2 border-dashed text-sm font-medium transition-all duration-300 ${
                isOver
                  ? "border-violet-300 text-white bg-violet-500/15"
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
    </div>
  );
}

export default Column;