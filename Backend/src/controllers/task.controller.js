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
        (m) => m.user.toString() === req.user.id
    )

    if (!isMember) {
      return res.status(403).json({ message: "Not a team member" });
    }


    const task = await taskModel.create({
        title,description,
        board: boardId,
        createdBy : req.user.id
    })

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {createTask}
