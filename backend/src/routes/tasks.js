const express = require('express');
const epiDataRouter = express.Router();
const epiDataTaskController = require('../controllers/taskController');
const epiDataValidateTask = require('../middlewares/validateTask');

epiDataRouter.get('/', epiDataTaskController.getAllTasks);
epiDataRouter.get('/:id', epiDataTaskController.getTaskById);
epiDataRouter.post('/', epiDataValidateTask, epiDataTaskController.createTask);
epiDataRouter.put('/:id', epiDataValidateTask, epiDataTaskController.updateTask);
epiDataRouter.delete('/:id', epiDataTaskController.deleteTask);

module.exports = epiDataRouter;
