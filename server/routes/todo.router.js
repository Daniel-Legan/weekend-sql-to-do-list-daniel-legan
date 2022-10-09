const express = require('express');
const todoRouter = express.Router();

// database connection
const pool = require('../modules/pool');

// GET
todoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo" ORDER BY "id";';

    pool.query(queryText)
        .then(result => {
            // result.rows is an array of objects from the database
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error getting todo', error);
            res.sendStatus(500);
        });
});

// POST
todoRouter.post('/', (req, res) => {
    // req.body/newToDo is an object
    let newToDo = req.body;
    console.log('adding newToDo', newToDo);

    let queryText = `INSERT INTO "todo" ("comment")
                    VALUES ($1);`;
    // adding the object's property comment into '$1' command to database
    pool.query(queryText, [newToDo.comment])
        .then(result => {
            // okay
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('error adding todo', error);
        });
});

// PUT
todoRouter.put('/:id', (req, res) => {
    // req.params.id is the id of the element clicked on on the DOM
    console.log('in PUT with id', req.params.id);

    const toDoID = req.params.id;
    
    // command to toggle complete status
    let sqlText = `UPDATE "todo" SET "complete" = NOT "complete" WHERE "id" = $1;`;

    // places the id into the command to database
    pool.query(sqlText, [toDoID])
        .then((databaseResult) => {
            // okay
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
            // okay
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error deleting todo', error);
            res.sendStatus(500);
        });
});


module.exports = todoRouter;