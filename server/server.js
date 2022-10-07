console.log('in server.js');

const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todo.router.js');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use('/todo', todoRouter);

app.use(express.static('server/public'))

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});