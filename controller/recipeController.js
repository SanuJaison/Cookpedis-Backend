const recipes = require("../models/recipeModel");


//get all recipes
exports.getAllrecipesController = async (req, res) => {
    console.log("getAllrecipesController");

    try {
        const data = await recipes.find()
        res.status(200).json(data)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server error",
            error
        })
    }
}


//add recipe


//edit recipe
exports.viewRecipeController = async (req, res) => {
    try {
        console.log('--- view recipe ---');
        const { id } = req.params
        const reicpeDetails = await recipes.findById(id)
        res.status(200).json(reicpeDetails)

    } catch (error) {
        console.log({
            location: "viewRecipeController",
            error
        });
        res.status(500).json('Server Error')
    }
}

exports.getRecipeByCuisineController = async (req, res) => {
    console.log('---recipe by cuisine---');
    
    try {
        const {id} = req.params
        const { cuisine } = req.query
        console.log({
            id,cuisine
        });
        
        const result = await recipes.find({ cuisine: cuisine, _id: { $ne: id} })
        res.status(200).json(result)
    } catch (error) {
        console.log({
            location: "getRecipeByCuisine",
            error
        });
        res.status(500).json('Server Error')
    }
}

