import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getTasksFromStorage, saveTasksToStorage } from "../utils/storage";
import { TASK_STATUS, PRIORITY } from "../utils/constants";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = getTasksFromStorage();

    if (savedTasks.length > 0) {
      setTasks(savedTasks);
    } else {
      setTasks([
        {
          id: uuidv4(),
          title: "Build Sidebar",
          description: "Create sidebar navigation layout",
          status: TASK_STATUS.TODO,
          priority: PRIORITY.HIGH,
          tag: "UI",
          createdAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          title: "Setup Drag & Drop",
          description: "Install and configure dnd-kit",
          status: TASK_STATUS.DOING,
          priority: PRIORITY.MEDIUM,
          tag: "Logic",
          createdAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          title: "Deploy App",
          description: "Push repo and deploy on Netlify",
          status: TASK_STATUS.DONE,
          priority: PRIORITY.LOW,
          tag: "Launch",
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      ...taskData,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = (id, updatedData) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        moveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);