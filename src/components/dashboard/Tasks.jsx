import Board from "../Board";

function Tasks({
  setIsModalOpen,
  setEditingTask,
  setDefaultStatus,
}) {
  return (
    <Board
      setIsModalOpen={setIsModalOpen}
      setEditingTask={setEditingTask}
      setDefaultStatus={setDefaultStatus}
    />
  );
}

export default Tasks;