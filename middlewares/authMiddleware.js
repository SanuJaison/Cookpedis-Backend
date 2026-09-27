const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    console.log("Inside authMiddleware");
    const token = req.headers["authorization"].split(" ")[1]

    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.payload = jwtResponse.userMail
            req.role = jwtResponse.role
            next()
        } catch (error) {
            console.log(error);
            res.status(404).json("Authorization failed, invalid token")
        }

    }
    else {
        res.status(404).json("Authorization failed")
    }

}
module.exports = authMiddleware