const savedRecipes = require("../models/savedRecipeModel");

//saved recipe
exports.addToSaved = async (req, res) => {
    try {
        console.log("Inside addToSaved");
        const userMail = req.payload
        const { name, image } = req.body
        const { id } = req.params

        const existingRecipe = await savedRecipes.findOne({ recipeId: id, userMail })
        if (existingRecipe) {
            res.status(409).json("Recipe already in your collection, add new one")
        }
        else {
            const newRecipe = await savedRecipes.create({ recipeId: id, name, image, userMail })
            res.status(200).json(newRecipe)
        }

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

//get user recipe collection
exports.getCollection = async (req, res) => {
    try {
        console.log("Inside getCollection");
        const userMail = req.payload
        const userCollection = await savedRecipes.find({ userMail })
        res.status(200).json(userCollection)


    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

//remove user collection
exports.removeRecipe = async (req, res) => {
    try {
        console.log("Inside removeRecipe");
        const { id } = req.params
        const deletedRecipe = await savedRecipes.findByIdAndDelete({ _id: id })
        res.status(200).json(deletedRecipe)


    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}