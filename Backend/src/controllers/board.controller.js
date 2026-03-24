const boardModel = require("../models/board.model");
const teamModel = require("../models/team.model");

async function createBoard(req, res) {
  try {
    const { name, teamid } = req.body;

    if (!name || !teamid) {
      return res.status(400).json({ message: "Name and Teamid is required" });
    }

    const team = await teamModel.findById(teamid);

    if (!team) {
      return res.status(400).json({ message: "Team not found" });
    }

    const isAdmin = team.members.some(
      (m) => m.user.toString() === req.user.id && m.role === "admin",
    );

    if (!isAdmin) {
      return res.status(403).json({
        message: "Only admin can create board",
      });
    }

    const board = await boardModel.create({
      name,
      team: teamid,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      board,
    });
  } catch (error) {

    res.status(500).json({ message: error.message });

  }
}

async function getBoardByTeam(req,res){
    try {
    const teamId = req.params.teamId || req.params.teamid;

    // 🔍 check team exists
    const team = await teamModel.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // 🔐 check membership
    const isMember = team.members.some(
      (m) => m.user.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const boards = await boardModel.find({ team: teamId });

    res.status(200).json({
      success: true,
      boards,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {createBoard ,  getBoardByTeam}
