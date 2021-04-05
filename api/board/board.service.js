const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const moment = require('moment');


async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('board')

    try {
        const boards = await collection.find().toArray();
        return boards
    } catch (err) {
        throw err;
    }
}


async function getById(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        const board = await collection.findOne({ '_id': ObjectId(boardId) })
        return board
    } catch (err) {
        throw err;
    }
}

async function remove(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.deleteOne({ "_id": ObjectId(boardId) })
    } catch (err) {
        throw err;
    }
}


async function add(data) {
    var board = _createEmptyBoard(data);
    const collection = await dbService.getCollection('board')
    try {
        await collection.insertOne(board);
        return board;
    } catch (err) {
        throw err;
    }
}

async function update(board) {
    const collection = await dbService.getCollection('board')
    board._id = ObjectId(board._id);
    try {
        await collection.updateOne({ '_id': board._id }, { $set: board })
        return board
    } catch (err) {
        throw err;
    }
}


async function createList(data) {
    var newList = {
        "_id": ObjectId(),
        "title": data.listTitle,
        "styles": {},
        "cards": []
    }
    var boardCopy = { ...data.board };
    boardCopy.lists.push(newList);
    const collection = await dbService.getCollection('board');
    boardCopy._id = ObjectId(boardCopy._id);
    try {
        await collection.updateOne({ '_id': boardCopy._id }, { $set: boardCopy });
        return boardCopy;
    } catch (err) {
        throw err;
    }
}


async function createCard(data) {
    var newCard = {
        "_id": ObjectId(),
        "title": data.txt,
        "comments": [],
        "styles": {},
        "labels": []
    }
    var boardCopy = { ...data.board };
    var listIdx = data.board.lists.findIndex(list => list._id === data.list._id);
    boardCopy.lists[listIdx].cards.push(newCard);
    const collection = await dbService.getCollection('board');
    boardCopy._id = ObjectId(boardCopy._id);
    try {
        await collection.updateOne({ '_id': boardCopy._id }, { $set: boardCopy });
        return boardCopy;
    } catch (err) {
        throw err;
    }
}


function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.name) {
        criteria.name = filterBy.name
    }

    return criteria;
}


function _createEmptyBoard(data) {
    return {
        "_id": ObjectId(),
        "title": data.boardTitle,
        "createdAt": moment().format('MMMM Do YYYY, h:mm:ss a'),
        "createdBy": data.user,
        "isStarred": false,
        "styles": {
            "background": "#0079BF"
        },
        "members": [
            data.user
        ],
        "lists": [
            {
                "_id": ObjectId(),
                "title": "To Do",
                "cards": [
                ]
            },
            {
                "_id": ObjectId(),
                "title": "Doing",
                "cards": [
                ]
            },
            {
                "_id": ObjectId(),
                "title": "Done",
                "cards": [
                ]
            }
        ]
    }
}


module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    createList,
    createCard,
}