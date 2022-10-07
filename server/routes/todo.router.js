const express = require('express');
const todoRouter = express.Router();

// database connection
const pool = require('../modules/pool');

// GET
todoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo";';
    pool.query(queryText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting todos', error);
        res.sendStatus(500);
    });
});

// POST

// PUT

// DELETE

module.exports = todoRouter;