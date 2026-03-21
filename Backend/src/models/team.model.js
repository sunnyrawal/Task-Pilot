const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    role : {
        type : String,
        enum : ["admin" ,  "member"],
        default : "member",
    },
},
    {_id:false}
);

const teamSchema = new mongoose.Schema({
    name : {
        type : String,
        required :true
    },
    inviteCode : {
        type : String,
        required:true,
        unique  : true
    },
    members : [memberSchema],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref :"user"
    }
},
    {timestamps : true}

)


const teamModel =  mongoose.model("team" , teamSchema)

module.exports = teamModel;