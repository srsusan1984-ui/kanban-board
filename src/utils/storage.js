const STORAGE_KEY = "kanban_tasks";

export const getTasksFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTasksToStorage = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};