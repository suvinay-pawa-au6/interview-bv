const express = require('express');
const authRoutes = require('./auth.route');

const router = express.Router();

// Auth Routes
router.use("/auth" , authRoutes)
// Additional categories can be added here
module.exports = router;
