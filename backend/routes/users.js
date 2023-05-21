const express = require("express");

const router = express.Router();

const { loginUser, signinUser } = require("../controllers/userController");

// Login
router.post("/login", loginUser);

// Signin
router.post("/signin", signinUser);

module.exports = router;
