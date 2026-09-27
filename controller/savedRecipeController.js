const savedRecipes = require("../models/savedRecipeModel");

// add recipe 
exports.addRecipeToCollectionController = async (req, res) => {
    console.log('--add recipe to collection---');
    try {
        const userMail = req.email
        const { name, image } = req.body
        const { recipeID } = req.params

        const existingRecipe = await savedRecipes.findOne({ recipeID, userMail })
        if (existingRecipe) {
            res.status(409).json('Recipe already in collection')
        } else {
            const newRecipe = await savedRecipes.create({
                recipeID,
                userMail,
                name,
                image
            })
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.getUserRecipeCollectionController = async (req, res) => {
    console.log('---get user recipes---');
    try {
        const userMail = req.email
        const userCollection = await savedRecipes.find({ userMail })
        res.status(200).json(userCollection)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.deleteUserRecipeController = async (req, res) => {
    console.log('---deleteUserRecipeController---');
    try {
        const { itemID } = req.params
        const result = await savedRecipes.findByIdAndDelete(itemID)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}