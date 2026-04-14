const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];
let id = 1;

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// CREATE task
app.post('/tasks', (req, res) => {
  const task = {
    id: id++,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || 'pending'
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;