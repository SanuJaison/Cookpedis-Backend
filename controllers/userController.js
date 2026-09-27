const Users = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//register
exports.register = async (req, res) => {
    try {
        console.log("Inside register controller");
        const { username, email, password } = req.body
        const existingUser = await Users.findOne({ email })

        if (existingUser) {
            res.status(200).json('User already exist pls login')
        }
        else {
            const encryptedPassword = await bcrypt.hash(password, 10)
            const newUser = await Users.create({ username, email, password: encryptedPassword })
            res.status(201).json(newUser)
        }

    } catch (error) {
        res.status(500).json({ message: "Something Went wrong" })
    }
}

//login
exports.login = async (req, res) => {
    try {
        console.log("Inside login controller");
        const { email, password } = req.body
        const existingUser = await Users.findOne({ email })

        if (existingUser) {
            const isPasswordMatch = await bcrypt.compare(password, existingUser.password)
            if (isPasswordMatch) {
                const token = jwt.sign({ userMail: email, role: existingUser.role }, process.env.JWT_SECRET_KEY)
                res.status(200).json({ user: existingUser, token })
            }
            else {
                res.status(401).json({ messge: "Login Failed" })
            }

        }
        else {
            res.status(400).json(`Authentication Failed`)
        }

    } catch (error) {
        res.status(500).json({ message: "Something Went wrong" })
    }
}

//profile
exports.editProfile = async (req, res) => {
    try {
        console.log("Inside editprofilw controller");
        const uploadProfilePicture = req.file
        const { id } = req.params
        console.log(req.file);
        
        const existingUser = await Users.findById({ _id: id })
        existingUser.picture = uploadProfilePicture.filename
        await existingUser.save()
        res.status(200).json(existingUser)
    } catch (error) {
        res.status(500).json({ message: "Something Went wrong", error: error.message })
    }
}