const express = require('express');
const teamController = require('../controllers/team.controller');
const { protect } = require('../middlewares/auth.middleware');



const router =  express.Router()

router.post('/create',protect,teamController.createTeam)
router.post('/join',protect,teamController.joinTeam)
router.get('/',protect,teamController.getMyTeams)



module.exports = router