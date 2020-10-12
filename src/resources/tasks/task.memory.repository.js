const Task = require('./task.model');

let tasks = [];

const getAll = async boardId => {
  return tasks.filter(task => task.boardId === boardId);
};

const getById = async (boardId, taskId) => {
  return tasks.find(task => task.boardId === boardId && task.id === taskId);
};

const getByUserId = async userId => {
  return tasks.filter(task => task.userId === userId);
};

const createTask = async task => {
  const newTask = new Task({ ...task });

  tasks.push(newTask);

  return newTask;
};

const updateTask = async (boardId, taskId, taskUpdated) => {
  const currentTask = tasks.find(
    task => task.boardId === boardId && task.id === taskId
  );

  currentTask.title = taskUpdated.title;
  currentTask.order = taskUpdated.order;
  currentTask.description = taskUpdated.description;
  currentTask.userId = taskUpdated.userId;
  currentTask.boardId = taskUpdated.boardId;
  currentTask.columnId = taskUpdated.columnId;

  return currentTask;
};

const deleteTask = async (boardId, taskId) => {
  tasks = tasks.filter(task => task.boardId === boardId && task.id !== taskId);
};

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteTask,
  getByUserId
};
