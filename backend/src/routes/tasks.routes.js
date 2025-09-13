const { Router } = require('express');
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks.controllers');

const router = Router();

router.get('/tasks', getAllTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;