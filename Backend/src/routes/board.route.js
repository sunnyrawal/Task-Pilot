const express = require('express')
const { protect } = require('../middlewares/auth.middleware')
const { createBoard, getBoardByTeam } = require('../controllers/board.controller')

const router =  express.Router()

router.post('/create-board',protect,createBoard)
router.get('/:teamId',protect,getBoardByTeam)

module.exports = router