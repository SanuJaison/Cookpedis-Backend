const express = require("express")
const { register, login, editProfile } = require("../controllers/userController")
const { addTestimonails, getApprovedTestimonials } = require("../controllers/testimonialController")
const { getAllRecipes, viewRecipe, relatedRecipes, addRecipe } = require("../controllers/recipeController")
const { addToSaved, getCollection, removeRecipe } = require("../controllers/savedRecipeController")
const authMiddleware = require("../middlewares/authMiddleware")
const { downloadRecipe, getUserDownloadList, getAllDownloadList } = require("../controllers/downloadController")
const multerMiddleware = require("../middlewares/multerMiddleware")

const router = new express.Router()

//register
router.post("/register", register)

//login
router.post("/login", login)

//add testimony
router.post("/add-testimony", addTestimonails)

//get all recipes
router.get("/recipes", getAllRecipes)

//gett approved testimonials
router.get("/approved-testimonials", getApprovedTestimonials)

// view recipe
router.get("/view/:id/recipe", authMiddleware, viewRecipe)

//related recipe
router.get("/related-recipe/:id", relatedRecipes)

// Add recipe to saved collection
router.post("/save-recipe/:id", authMiddleware, addToSaved);

// Get logged-in user's saved recipes
router.get("/saved-recipes", authMiddleware, getCollection);

// Remove recipe from saved collection
router.delete("/remove-recipe/:id", authMiddleware, removeRecipe);

//add to download
router.post("/downloads/:id", authMiddleware, downloadRecipe)

//get dowmloads
router.get("/user-downloads", authMiddleware, getUserDownloadList)

//update user profile
router.put("/profile/:id", authMiddleware, multerMiddleware.single("picture"), editProfile)

//get all downloads
router.get("/admin/downloads", getAllDownloadList)

//add recipe
router.post("/admin/add-recipe", addRecipe)

module.exports = router