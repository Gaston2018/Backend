const epiDataTaskService = require('../services/taskService');

const getAllTasks = (_req, res) => {
  const epiDataTasks = epiDataTaskService.getAll();
  res.json({ data: epiDataTasks, total: epiDataTasks.length });
};

const getTaskById = (req, res) => {
  const epiDataTask = epiDataTaskService.getById(req.params.id);
  if (!epiDataTask) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  res.json({ data: epiDataTask });
};

const createTask = (req, res) => {
  const { title, description, status } = req.body;
  const epiDataNewTask = epiDataTaskService.create({ title, description, status });
  res.status(201).json({ data: epiDataNewTask, message: 'Tarea creada exitosamente' });
};

const updateTask = (req, res) => {
  const { title, description, status } = req.body;
  const epiDataUpdatedTask = epiDataTaskService.update(req.params.id, { title, description, status });
  if (!epiDataUpdatedTask) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  res.json({ data: epiDataUpdatedTask, message: 'Tarea actualizada exitosamente' });
};

const deleteTask = (req, res) => {
  const epiDataDeleted = epiDataTaskService.remove(req.params.id);
  if (!epiDataDeleted) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  res.json({ message: 'Tarea eliminada exitosamente' });
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
