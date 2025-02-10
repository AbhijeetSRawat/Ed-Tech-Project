// Import the required modules
const express = require("express")
const router = express.Router()

const { createPayment, verifySignature } = require("../controllers/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
router.post("/createPayment", auth, isStudent, createPayment)
router.post("/verifySignature", verifySignature)

module.exports = router