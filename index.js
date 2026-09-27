require("dotenv").config()

const express = require("express")
const cors = require("cors")

require("./config/dbConnection")
const router = require("./routes/routes")

const cookPediaServer = express()

cookPediaServer.use(cors())
cookPediaServer.use(express.json())
cookPediaServer.use(router)
cookPediaServer.use("/uploads", express.static("./uploads"))

cookPediaServer.get("/", (req, res) => {
    res.status(200).send("CookPedia Server Started")
})

const PORT = process.env.PORT

cookPediaServer.listen(PORT, () => {
    console.log(`CookPedia Server Running on PORT : ${PORT}`);

})