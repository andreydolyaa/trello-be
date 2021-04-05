const express = require('express');
const { addBoard, updateBoard, getBoards, getBoard, deleteBoard } = require('./board.controller');
const router = express.Router();


router.get('/', getBoards);
router.get('/:id', getBoard);
router.post('/', addBoard);
router.put('/:id', updateBoard);
router.delete('/:id', deleteBoard);

module.exports = router