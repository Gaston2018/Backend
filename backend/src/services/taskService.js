const { v4: uuidv4 } = require('uuid');

let epiDataTasksStore = [];

const getAll = () => [...epiDataTasksStore];

const getById = (id) => epiDataTasksStore.find((epiDataTask) => epiDataTask.id === id) || null;

const create = ({ title, description = '', status = 'pendiente', author = '' }) => {
  const epiDataNewTask = {
    id: uuidv4(),
    title: title.trim(),
    description: description.trim(),
    status,
    author: author.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  epiDataTasksStore.push(epiDataNewTask);
  return epiDataNewTask;
};

const update = (id, { title, description, status, author }) => {
  const epiDataIndex = epiDataTasksStore.findIndex((t) => t.id === id);
  if (epiDataIndex === -1) return null;
  epiDataTasksStore[epiDataIndex] = {
    ...epiDataTasksStore[epiDataIndex],
    ...(title !== undefined && { title: title.trim() }),
    ...(description !== undefined && { description: description.trim() }),
    ...(status !== undefined && { status }),
    ...(author !== undefined && { author: author.trim() }),
    updatedAt: new Date().toISOString(),
  };
  return epiDataTasksStore[epiDataIndex];
};

const remove = (id) => {
  const epiDataIndex = epiDataTasksStore.findIndex((t) => t.id === id);
  if (epiDataIndex === -1) return false;
  epiDataTasksStore.splice(epiDataIndex, 1);
  return true;
};

const reset = () => { epiDataTasksStore = []; };

module.exports = { getAll, getById, create, update, remove, reset };
