const router = require('express').Router();
const boardService = require('./board.service');
const catchErrors = require('../../services/catch-errors.service');

router.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await boardService.getAll();

    res.json(boards);
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const id = req.params.id;

    if (id) {
      const currentBoard = await boardService.getById(id);
      if (currentBoard) {
        res.json(currentBoard);
      } else {
        res.status(404).json(null);
      }
    }
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const currentBoard = req.body;
    const newBoard = await boardService.createBoard(currentBoard);

    res.json(newBoard);
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const currentBoard = req.body;

    const newBoard = await boardService.updateBoard(currentBoard);

    res.json(newBoard);
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const id = req.params.id;

    await boardService.deleteBoard(id);

    res.json(null);
  })
);

module.exports = router;
