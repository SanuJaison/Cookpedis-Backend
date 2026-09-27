const testimonials = require("../models/testimonialMOdel");

//add testimonial
exports.addTestimonialController = async (req, res) => {
    console.log('---addTestimonialController----');

    try {
        const { name, email, message } = req.body
        const newTestimony = await testimonials.create({
            name, email, message
        })
        res.status(201).json(newTestimony)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}

//get all testimonial


//update testimonial - admin


//get all testimonial - admin