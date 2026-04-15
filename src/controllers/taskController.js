const taskStore = require('../store/taskStore');

const getAllTasks = (req, res) => {
  res.json(taskStore.getAll());
};

const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string.' });
  }

  const task = taskStore.create({ title: title.trim(), description: description || '' });
  res.status(201).json(task);
};

const updateTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description, completed } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid task ID.' });
  }

  const updated = taskStore.update(id, { title, description, completed });

  if (!updated) {
    return res.status(404).json({ error: `Task with id ${id} not found.` });
  }

  res.json(updated);
};

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid task ID.' });
  }

  const deleted = taskStore.remove(id);

  if (!deleted) {
    return res.status(404).json({ error: `Task with id ${id} not found.` });
  }

  res.status(204).send();
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
