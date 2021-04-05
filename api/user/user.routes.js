const express = require('express')
const { getUser, getUsers, deleteUser, updateUser, signup, login } = require('./user.controller')
const router = express.Router()


router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router