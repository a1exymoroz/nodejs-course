const router = require('express').Router();
const taskService = require('./task.service');
const catchErrors = require('../../services/catch-errors.service');
const Task = require('./task.model');

router.route('/:boardId/tasks').get(
  catchErrors(async (req, res) => {
    const boardId = req.params.boardId;
    const tasks = await taskService.getAll(boardId);

    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:boardId/tasks/:taskId').get(
  catchErrors(async (req, res) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;

    const task = await taskService.getById(boardId, taskId);

    if (task) {
      res.json(Task.toResponse(task));
    } else {
      res.status(404).json(null);
    }
  })
);

router.route('/:boardId/tasks').post(
  catchErrors(async (req, res) => {
    const boardId = req.params.boardId;
    const task = req.body;
    const newTask = await taskService.createTask(boardId, task);

    res.json(Task.toResponse(newTask));
  })
);

router.route('/:boardId/tasks/:taskId').put(
  catchErrors(async (req, res) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    const currentTask = req.body;

    const newTask = await taskService.updateTask(boardId, taskId, currentTask);

    res.json(Task.toResponse(newTask));
  })
);

router.route('/:boardId/tasks/:taskId').delete(
  catchErrors(async (req, res) => {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;

    await taskService.deleteTask(boardId, taskId);

    res.json(null);
  })
);

module.exports = router;
