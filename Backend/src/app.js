const express = require('express');
const authRoutes = require('./routes/auth.route')
const cookieParser = require('cookie-parser')
const teamRoutes = require('./routes/team.route')
const boardRoutes = require('./routes/board.route')
const taskRoutes = require('./routes/task.route')


const app =express();
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth/',authRoutes)
app.use('/api/team/',teamRoutes)
app.use('/api/board/',boardRoutes)
app.use('/api/task' , taskRoutes)

module.exports=app;