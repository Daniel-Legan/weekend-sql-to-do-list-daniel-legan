const express = require('express');
const todoRouter = express.Router();

// database connection
const pool = require('../modules/pool');

// GET
todoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo" ORDER BY "id";';
    // let queryText = 'SELECT * FROM "todo" ORDER BY "created_at";';
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
            console.log('error adding todo', error);
        });
});

// PUT
todoRouter.put('/:id', (req, res) => {
    console.log('in PUT with id', req.params.id);
    const toDoID = req.params.id;

    let sqlText = `UPDATE "todo" SET "complete" = NOT "complete" WHERE "id" = $1;`;

    pool.query(sqlText, [toDoID])
        .then((databaseResult) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error updating todo', error);
            res.sendStatus(500);
        });
});

// DELETE
todoRouter.delete('/:id', (req, res) => {
    console.log('in DELETE with id:', req.params.id);
    const toDoID = req.params.id;
  
    const sqlText = `DELETE FROM "todo" WHERE "id" = $1;`;
    const sqlParams = [toDoID];
  
    pool.query(sqlText, sqlParams)
        .then((databaseResult) => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log('error deleting todo', error);
          res.sendStatus(500);
        });
  });


module.exports = todoRouter;