import { useState } from "react";
import Column from "./Column";
import {
  DndContext,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import { useTask } from "../context/TaskContext";

function Board({
  setIsModalOpen,
  setEditingTask,
  setDefaultStatus,
}) {
  const { tasks, moveTask } = useTask();

  const [activeId, setActiveId] =
    useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const draggedTask = tasks.find(
      (t) => t.id === active.id
    );

    const targetColumn = over.id;

    const validColumns = [
      "todo",
      "doing",
      "done",
    ];

    if (
      validColumns.includes(
        targetColumn
      ) &&
      draggedTask &&
      draggedTask.status !==
        targetColumn
    ) {
      moveTask(
        active.id,
        targetColumn
      );
    }

    setActiveId(null);
  };

  const getActiveTask = () =>
    tasks.find(
      (t) => t.id === activeId
    );

  return (
    <DndContext
      collisionDetection={
        closestCorners
      }
      modifiers={[
        restrictToFirstScrollableAncestor,
      ]}
      onDragStart={
        handleDragStart
      }
      onDragEnd={
        handleDragEnd
      }
    >
      <div className="flex-1 overflow-hidden px-8 py-6">
        <p className="text-sm text-slate-400 mb-4">
          Drag tasks between columns
          to change status.
        </p>

        {/* Board Workspace */}
        <div className="h-full rounded-3xl border border-white/10 bg-[#0f172a]/40 p-4 overflow-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
            <Column
              title="To Do"
              status="todo"
              isDragging={!!activeId}
              setIsModalOpen={
                setIsModalOpen
              }
              setEditingTask={
                setEditingTask
              }
              setDefaultStatus={
                setDefaultStatus
              }
            />

            <Column
              title="Doing"
              status="doing"
              isDragging={!!activeId}
              setIsModalOpen={
                setIsModalOpen
              }
              setEditingTask={
                setEditingTask
              }
              setDefaultStatus={
                setDefaultStatus
              }
            />

            <Column
              title="Done"
              status="done"
              isDragging={!!activeId}
              setIsModalOpen={
                setIsModalOpen
              }
              setEditingTask={
                setEditingTask
              }
              setDefaultStatus={
                setDefaultStatus
              }
            />
          </div>
        </div>
      </div>

      <DragOverlay
  dropAnimation={null}
>
  {activeId ? (
    <div className="pointer-events-none rotate-1 scale-105">
      <div className="rounded-2xl p-4 bg-slate-900 border border-violet-400/40 shadow-[0_0_30px_rgba(139,92,246,0.35)] w-[320px]">
        {getActiveTask() && (
          <>
            <div className="text-white font-semibold text-sm">
              {getActiveTask().title}
            </div>

            <div className="text-slate-400 text-xs mt-2">
              {getActiveTask().description}
            </div>
          </>
        )}
      </div>
    </div>
  ) : null}
</DragOverlay>
    </DndContext>
  );
}

export default Board;