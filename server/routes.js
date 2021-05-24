const router = require("express").Router();

const authController = require("./auth");

const loginUser = authController.loginUser;
const signupUser = authController.signupUser;

router.post("/auth/login", loginUser);
router.post("/auth/signup", signupUser);

module.exports = router;
