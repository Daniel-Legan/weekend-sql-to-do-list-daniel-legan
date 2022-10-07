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
todoRouter.post('/', (req, res) => {
    let newToDo = req.body;
    console.log('adding newToDo', newToDo);

    let queryText = `INSERT INTO "todo" ("comment")
                    VALUES ($1);`;
    pool.query(queryText, [newToDo.comment])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('error adding newToDo.comment', error);
        });
});

// PUT

// DELETE

module.exports = todoRouter;