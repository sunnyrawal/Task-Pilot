const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected")
    } catch (error) {
        console.error(error)
        throw new Error("Error at DB")
    }
}

module.exports = connectDb