const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.post('/login-user', validate(authValidation.loginUser), authController.loginUser);
router.post('/register-user', validate(authValidation.registerUser), authController.registerUser);

module.exports = router;
