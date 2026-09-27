const downloads = require("../models/downloadModel");

//add to download list
exports.downloadRecipe = async (req, res) => {
    try {
        console.log("Inside downloadRecipe controller");
        const { id } = req.params
        const userMail = req.payload
        const { name, image, cuisine } = req.body
        const existingRecipe = await downloads.findOne({ recipeId: id, userMail })
        if (existingRecipe) {
            existingRecipe += 1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }
        else {
            const newRecipe = await downloads.create({
                recipeId: id, name, cuisine, image, count: 1, userMail
            })
            res.status(201).json(newRecipe)
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

//get user downloadlist
exports.getUserDownloadList = async (req, res) => {
    try {
        console.log("Inside getUserDownloadList controller");
        const userMail = req.payload
        const userDownloadList = await downloads.find({ userMail })
        res.status(200).json(userDownloadList)
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

//get all downloadlist
exports.getAllDownloadList = async (req, res) => {
    try {
        console.log("Inside getAllDownloadList controller");
        const allDownloadList = await downloads.find()
        res.status(200).json(allDownloadList)
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}