const express = require('express')
const { protect } = require('../middlewares/auth.middleware')
const { createTask, getTaskByBoard, assignTask, updateTaskStatus, updateTask, deleteTask } = require('../controllers/task.controller')

const router = express.Router()

router.post('/', protect, createTask)
router.get('/:boardId', protect, getTaskByBoard)
router.put('/:taskId/assign', protect, assignTask)
router.put('/:taskId/status', protect, updateTaskStatus)
router.put("/:taskId", protect, updateTask);
router.delete("/:taskId", protect, deleteTask);

module.exports = router