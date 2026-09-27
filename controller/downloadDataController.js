const downloads = require("../models/downloadModel");

exports.addDownloadController = async (req,res) => {
    try {
        console.log('---add download ---');
        const {id} = req.params
        const userMail = req.email
        const {name, image, cuisine}= req.body
        const existingRecipe = await downloads.find({recipeID:id, userMail})
        if(existingRecipe){
            existingRecipe.count += 1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }else{
            const newRecipe = await downloads.create({
                recipeID: id, name, cuisine, image, count: 1, userMail
            })
            res.status(201).json(newRecipe)
        }
        
    } catch (error) {
        console.log({
            location: "addDownloadController",
            error
        });
        
        res.status(500).json('server error')
    }
}