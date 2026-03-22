const userModel =  require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function register(req , res){
    try {
        const {name , email , password } = req.body;

        const userAlreadyExists =  await userModel.findOne({email});
        
        if(userAlreadyExists){
            return res.status(403).json({message : "user already exists"})
        }

        const hash = await bcrypt.hash(password , 10);

        const user = await userModel.create({
            name,email,password : hash
        })

        const token = jwt.sign({
            id :user._id
        },process.env.JWT_SECRET)

        res.cookie("token",token);


        res.status(201).json({message : "User Created"})
         
    } catch (error) {
        console.error(error)
        res.status(400).json({message : "Error"})
    }
}

async function login(req,res){
    try {
        const {email , password}= req.body;

        const user =  await userModel.findOne({email});

        if(!user){
            return res.status(401).json({message : "User not found"})
        }

        const isPasswordValid = await  bcrypt.compare(password , user.password)

        if(!isPasswordValid){
            return res.status(401).json({message : "Invalid Credentials"})
        }

        const token = jwt.sign({
            id : user._id
        },process.env.JWT_SECRET)

        res.cookie("token",token);

        res.status(201).json({message : "Login successful!"})


    } catch (error) {
        console.error(error)

    }
}

async function logout(req, res) {
    res.clearCookie("token")
    res.status(200).json({ message: "User logged out successfully" })
}

module.exports = {
    register , login , logout
}