const mongoose =  require('mongoose')

const taskSchema =  new mongoose.Schema({
    
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },

    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    dueDate: {
      type: Date,
    },
})

const taskModel = mongoose.model('task',taskSchema )

module.exports =  taskModel