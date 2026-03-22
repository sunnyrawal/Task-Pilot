
const teamModel = require("../models/team.model");
const {nanoid} = require("nanoid");

async function createTeam(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required" });
    }

    const team = await teamModel.create({
      name,
      inviteCode: nanoid(6),
      createdBy: req.user.id,
      members: [
        {
          user: req.user.id,
          role: "admin",
        },
      ],
    });

    res.status(201).json({
      success: true,
      team,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function joinTeam(req, res) {
  try {
    const { inviteCode } = req.body;

    if (!inviteCode) {
      return res.status({ message: "Invite Code needed" });
    }

    const team = await teamModel.findOne({ inviteCode });

    if (!team) {
      return res.status(404).json({ message: "Invalid Invite Code" });
    }

    const isAlreadyMember = team.members.find(
      (m) => m.user.toString === req.user.id,
    );

    if (isAlreadyMember) {
      return res.status(400).json({ message: "Already a member" });
    }

    team.members.push({
      user: req.user.id,
      role: "member",
    });

    await team.save();

    res.status(200).json({
      success: true,
      message: "Joined team successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getMyTeams (req,res){
    try {
    const teams = await teamModel.find({
      "members.user": req.user.id,
    });

    res.status(200).json({
      success: true,
      teams: teams.map(t => t.name),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createTeam,joinTeam , getMyTeams
};
