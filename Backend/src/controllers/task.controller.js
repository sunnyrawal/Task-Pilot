const boardModel = require("../models/board.model");
const taskModel = require("../models/task.model");
const teamModel = require("../models/team.model");

async function createTask(req, res) {
  try {
    const { title, description, boardId } = req.body;

    if (!title || !boardId) {
      return res.status(400).json({ message: "Title and boardId required" });
    }

    const board = await boardModel.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const team = await teamModel.findById(board.team);

    const isMember = team.members.some(
      (m) => m.user.toString() === req.user.id,
    );

    if (!isMember) {
      return res.status(403).json({ message: "Not a team member" });
    }

    const task = await taskModel.create({
      title,
      description,
      board: boardId,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTaskByBoard(req, res) {
  try {
    const { boardId } = req.params;

    const board = await boardModel.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const team = await teamModel.findById(board.team);

    const isMember = team.members.some(
      (m) => m.user.toString() === req.user.id,
    );

    if (!isMember) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const tasks = await taskModel
      .find({ board: boardId })
      .populate("assignedTo", "name email");

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function assignTask(req, res) {
  try {
    const { userId } = req.body;
    const { taskId } = req.params;

    const task = await taskModel.findById(taskId).populate("board");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const team = await teamModel.findById(task.board.team);

    // 🔐 check assigned user is in team
    const isMember = team.members.some((m) => m.user.toString() === userId);

    if (!isMember) {
      return res.status(400).json({ message: "User not in team" });
    }

    task.assignedTo = userId;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task assigned",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateTaskStatus(req, res) {
  try {
    const { status } = req.body;
    const { taskId } = req.params;

    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔐 only assigned user can update
    if (task.assignedTo && task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = status;

    await task.save();

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;

    const task = await taskModel.findById(taskId).populate("board");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔍 get team
    const team = await teamModel.findById(task.board.team);

    // 🔐 check admin
    const isAdmin = team.members.some(
      (m) => m.user.toString() === req.user.id && m.role === "admin",
    );

    // 🔐 check creator
    const isCreator = task.createdBy.toString() === req.user.id;

    if (!isAdmin && !isCreator) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateTask(req,res){
  try {
    const { taskId } = req.params;
    const { title, description, dueDate } = req.body;

    const task = await taskModel.findById(taskId).populate("board");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔍 get team
    const team = await teamModel.findById(task.board.team);

    // 🔐 check admin
    const isAdmin = team.members.some(
      (m) =>
        m.user.toString() === req.user.id &&
        m.role === "admin"
    );

    // 🔐 check creator
    const isCreator = task.createdBy.toString() === req.user.id;

    if (!isAdmin && !isCreator) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // ✏️ update fields (only if provided)
    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;

    await task.save();

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createTask, getTaskByBoard, assignTask, updateTaskStatus ,deleteTask,updateTask };
