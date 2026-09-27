const mongoose = require("mongoose")

const downloadSchema = new mongoose.Schema({
    recipeId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cuisine: {
        type: Array,
        required: true
    },
    image: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    userMail: {
        type: Number,
        required: true
    }


})

const downloads = mongoose.model("downloads", downloadSchema)
module.exports = downloads