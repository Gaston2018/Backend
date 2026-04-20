const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let tasks = [];
let nextId = 1;

// GET /tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const { title, description, createdBy } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (!createdBy || createdBy.trim() === '') {
    return res.status(400).json({ error: 'createdBy is required' });
  }
  const task = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    createdBy: createdBy.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const { title, description, completed } = req.body;
  if (title !== undefined && title.trim() === '') {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }
  tasks[index] = {
    ...tasks[index],
    title: title !== undefined ? title.trim() : tasks[index].title,
    description: description !== undefined ? description.trim() : tasks[index].description,
    completed: completed !== undefined ? Boolean(completed) : tasks[index].completed,
    updatedAt: new Date().toISOString()
  };
  res.json(tasks[index]);
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(index, 1);
  res.status(204).send();
});

app.resetTasks = () => { tasks = []; nextId = 1; };

if (require.main === module) {
  app.listen(PORT, () => console.log(`Task Manager running on http://localhost:${PORT}`));
}

module.exports = app;
