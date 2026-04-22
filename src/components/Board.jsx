import { useState } from "react";
import Column from "./Column";
import TaskCard from "./TaskCard";
import {
  DndContext,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import { useTask } from "../context/TaskContext";

function Board({
  setIsModalOpen,
  setEditingTask,
  setDefaultStatus,
}) {
  const { tasks, moveTask } = useTask();
  const [activeTask, setActiveTask] = useState(null);

  const handleDragStart = ({ active }) => {
    const draggedTask = tasks.find(
      (task) => task.id === active.id
    );

    setActiveTask(draggedTask || null);
  };

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      moveTask(active.id, over.id);
    }

    setActiveTask(null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex-1 overflow-hidden px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
          <Column
            title="To Do"
            status="todo"
            setIsModalOpen={setIsModalOpen}
            setEditingTask={setEditingTask}
            setDefaultStatus={setDefaultStatus}
          />

          <Column
            title="Doing"
            status="doing"
            setIsModalOpen={setIsModalOpen}
            setEditingTask={setEditingTask}
            setDefaultStatus={setDefaultStatus}
          />

          <Column
            title="Done"
            status="done"
            setIsModalOpen={setIsModalOpen}
            setEditingTask={setEditingTask}
            setDefaultStatus={setDefaultStatus}
          />
        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-1 scale-105 opacity-95">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Board;