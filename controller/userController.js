const users = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//register
exports.registerController = async (req,res) => {
    try {
        console.log('register');
        const {
            username,
            password,
            email
        } = req.body
        const existingUser = await users.findOne({email})

        if(existingUser){
            res.status(400).json('An account exists with this email')
        }else{
            const encryptedPassword = await bcrypt.hash(password,10)
            const result = await users.create({
                username,email,password: encryptedPassword
            })
            res.status(200).json(result)
        }
        
    } catch (error) {
        console.log({
            location: "registerController",
            error
        });
        
        res.status(500).json({
            message: "Somethign went wrong",
            error
        })
    }
}

exports.loginController = async (req,res) => {
    try {
        const {
            email,
            password
        } = req.body

        const existingUser = await users.findOne({email})
        if(existingUser){
            const isMatch = await bcrypt.compare(password,existingUser.password)
            if(isMatch){
                const token = jwt.sign({email: email, role: existingUser.role},process.env.JWT_SECRET_KEY)
                res.status(200).json({
                    user: existingUser, token
                })
            }else{
                res.status(401).json('Invalid email/password')
            }
        }else{
            res.status(409).json('Accoutn does not exist')
        }
    } catch (error) {
        console.log({
            location: "loginController",
            error
        });
        
    }
}