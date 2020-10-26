const Task = require('./task.model');

const getAll = async boardId => {
  return await Task.find({ boardId });
};

const getById = async (boardId, taskId) => {
  return await Task.findOne({ boardId, _id: taskId });
};

const getByUserId = async userId => {
  return await Task.find({ userId });
};

const createTask = async task => {
  const taskCreated = new Task({ ...task });

  return await taskCreated.save();
};

const updateTask = async (boardId, taskId, taskUpdated) => {
  return await Task.updateOne({ boardId, _id: taskId }, taskUpdated);
};

const deleteTask = async (boardId, taskId) => {
  return await Task.deleteOne({ boardId, _id: taskId });
};

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteTask,
  getByUserId
};
