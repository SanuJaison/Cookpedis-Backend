const Recipes = require("../models/recipeModel")

//get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        console.log("Inside get all recipe controller");
        const allRecipes = await Recipes.find()
        res.status(200).json(allRecipes)

    } catch (error) {
        res.status(500).json({
            message: "Server Error", error: error.message
        })
    }
}

//view recipe
exports.viewRecipe = async (req, res) => {
    try {
        console.log("Inside viewRecipe controller");
        const { id } = req.params;
        const recipeDetails = await Recipes.findById(id);
        res.status(200).json(recipeDetails);

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

//rellated recipes
exports.relatedRecipes = async (req, res) => {
    try {
        console.log("Inside relatedRecipe controller");
        const { cuisine } = req.query
        const { id } = req.params;
        const relatedRecipe = await Recipes.find({ cuisine, _id: { $ne: id } })
        res.status(200).json(relatedRecipe)
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

//create reccipe
exports.addRecipe = async (req, res) => {
    try {
        console.log("Inside addRecipe controller");
        const { name,
            ingredients,
            instructions,
            prepTimeMinutes,
            cookTimeMinutes,
            servings,
            difficulty,
            cuisine,
            caloriesPerServing,
            image,
            mealType,
            reviewCount,
            rating,
            userId } = req.body
        const existingRecipe = await Recipes.findOne({ name })
        if (existingRecipe) {
            res.status(409).json("Recipe alreay exist")
        }
        else {
            const newRecipe = await Recipes.create({
                name,
                ingredients,
                instructions,
                prepTimeMinutes,
                cookTimeMinutes,
                servings,
                difficulty,
                cuisine,
                caloriesPerServing,
                image,
                mealType,
                reviewCount,
                rating,
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
