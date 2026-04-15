let tasks = [];
let nextId = 1;

const getAll = () => [...tasks];

const create = ({ title, description }) => {
  const task = {
    id: nextId++,
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  return task;
};

const update = (id, fields) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;

  const task = tasks[index];
  if (fields.title !== undefined) task.title = fields.title.trim();
  if (fields.description !== undefined) task.description = fields.description;
  if (fields.completed !== undefined) task.completed = Boolean(fields.completed);
  task.updatedAt = new Date().toISOString();

  return task;
};

const remove = (id) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;
  const [removed] = tasks.splice(index, 1);
  return removed;
};

const reset = () => {
  tasks = [];
  nextId = 1;
};

module.exports = { getAll, create, update, remove, reset };
