import { useTask } from "../context/TaskContext";
import toast from "react-hot-toast";
import { useDraggable } from "@dnd-kit/core";
import { FiMove } from "react-icons/fi";

function TaskCard({
  task,
  setIsModalOpen,
  setEditingTask,
}) {
  const { deleteTask } = useTask();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,

    transition: isDragging
      ? "none"
      : "transform 160ms ease",

    willChange: "transform",
  };

  const handleDelete = () => {
    deleteTask(task.id);
    toast.success("Task deleted");
  };

  const handleEdit = () => {
    setEditingTask?.(task);
    setIsModalOpen?.(true);
  };

  const priorityColor = {
    low:
      "bg-green-500/15 text-green-400 border border-green-400/10",

    medium:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-400/10",

    high:
      "bg-red-500/15 text-red-400 border border-red-400/10",
  };

  const statusCard = {
    todo:
      "bg-[#1a2238] border border-indigo-400/25 shadow-[0_0_24px_rgba(99,102,241,0.10)]",

    doing:
      "bg-[#1a2238] border border-amber-400/25 shadow-[0_0_24px_rgba(251,191,36,0.10)]",

    done:
      "bg-[#1a2238] border border-emerald-400/25 shadow-[0_0_24px_rgba(52,211,153,0.10)]",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded-2xl p-4 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl cursor-grab active:cursor-grabbing select-none ${
        statusCard[task.status]
      } ${
        isDragging
          ? "opacity-40 scale-95 shadow-2xl ring-2 ring-violet-400"
          : ""
      }`}
    >
      {/* Top */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg text-white tracking-tight">
          {task.title}
        </h3>

        <FiMove className="text-slate-500" />
      </div>

      {/* Description */}
      <p className="text-sm text-slate-400 mt-2 leading-relaxed">
        {task.description}
      </p>

      {/* Footer */}
      <div
        className="mt-5 flex items-center justify-between gap-3"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <span
          className={`px-2.5 py-1 rounded-xl text-xs font-medium capitalize ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>

        <div className="space-x-3 text-sm">
          <button
            onClick={handleEdit}
            className="text-blue-400 hover:text-blue-300 transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;