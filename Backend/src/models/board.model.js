const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    name : { 
        type :String ,
        required : true,

    },

    team : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'team',
        required : true
    },
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},
    {timestamps : true}
);

const boardModel =  mongoose.model('board',boardSchema)

module.exports  = boardModel