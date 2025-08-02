const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGODB

async function intializeDatabase() {
    await mongoose.connect(mongoUri)
    .then(() => {console.log("Connected Successfully")
    })
    .catch((error) => {console.log("Error in connecting database", error)
    })
}

module.exports = { intializeDatabase }