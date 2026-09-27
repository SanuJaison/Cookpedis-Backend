const Testimonials = require("../models/testimonialModel")

//add testimonials
exports.addTestimonails = async (req, res) => {
    try {
        console.log("Inside add testimonials controller");
        const { name, email, message } = req.body
        const newTestimony = await Testimonials.create({ name, email, message })
        res.status(201).json(newTestimony)

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

//approved testimonials
exports.getApprovedTestimonials = async (req, res) => {
    try {
        console.log("Inside getApprovedTestimonials controller");
        const approvedTestimony = await Testimonials.find({ status: { $eq: "Approved" } })
        res.status(201).json(approvedTestimony)

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}