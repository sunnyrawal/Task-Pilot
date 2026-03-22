const express = require('express');
const teamController = require('../controllers/team.controller');
const { protect } = require('../middlewares/auth.middleware');



const router =  express.Router()

router.post('/create-team',protect,teamController.createTeam)
router.post('/join-team',protect,teamController.joinTeam)
router.get('/',protect,teamController.getMyTeams)



module.exports = router