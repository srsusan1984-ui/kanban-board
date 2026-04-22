import { useState, useEffect } from "react";
import { useTask } from "../context/TaskContext";
import toast from "react-hot-toast";

function TaskModal({
  setIsModalOpen,
  editingTask,
  setEditingTask,
  defaultStatus,
}) {
  const { addTask, editTask } = useTask();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: defaultStatus || "todo",
    priority: "medium",
    tag: "General",
  });

  useEffect(() => {
    if (editingTask) {
      setForm(editingTask);
    } else {
      setForm({
        title: "",
        description: "",
        status: defaultStatus || "todo",
        priority: "medium",
        tag: "General",
      });
    }
  }, [editingTask, defaultStatus]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Title required");
      return;
    }

    if (editingTask) {
      editTask(editingTask.id, form);
      toast.success("Task updated");
    } else {
      addTask(form);
      toast.success("Task added");
    }

    setEditingTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-[#12182b]/95 p-6 shadow-2xl space-y-4"
      >
        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {editingTask ? "Edit Task" : "New Task"}
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Organize your workflow beautifully
          </p>
        </div>

        {/* Inputs */}
        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-2xl bg-[#1a2238] border border-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-violet-500"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="w-full rounded-2xl bg-[#1a2238] border border-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-violet-500 resize-none"
        />

        <div className="grid grid-cols-2 gap-3">
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-2xl bg-[#1a2238] border border-white/5 px-4 py-3 text-white outline-none"
          >
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="rounded-2xl bg-[#1a2238] border border-white/5 px-4 py-3 text-white outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 text-slate-300 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            className="flex-1 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 py-3 font-semibold hover:scale-[1.02] transition"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskModal;