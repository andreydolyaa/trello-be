
const boardService = require('./board.service')


async function getBoards(req, res) {
    try {
        const boards = await boardService.query(req.query)
        res.send(boards)
    } catch (err) {
        res.status(500).send({ error: 'cannot get boards' })

    }
}

async function getBoard(req, res) {
    const board = await boardService.getById(req.params.id)
    console.log('req.', req.params.id);
    res.send(board)
}

async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.end()
    } catch (err) {
        res.status(500).send({ error: 'cannot delete board' })
    }
}

async function addBoard(req, res) {
    var board = req.body
    try {
        var board = req.body;
        board = await boardService.add(board)
    } catch (err) {
        res.end().send('Could not add board');
    }
    res.send(board)
}

async function updateBoard(req, res) {
    try {
        const data = req.body;
        if (data.type === 'list') {
            boardService.createList(data);
            res.send(data);
        }
        else if (data.type === 'card') {
            boardService.createCard(data);
            res.send(data);
        }
        else {
            boardService.update(data.board);
            res.send(data.board);
        }

    } catch (err) {
        console.log('cannot update');
    }
}

module.exports = {
    getBoards,
    getBoard,
    deleteBoard,
    addBoard,
    updateBoard
}

