const router = require("express").Router();

const authController = require("../controllers/authentication/authController");

const loginUser = authController.loginUser;
const signupUser = authController.signupUser;
const refreshToken = authController.refreshToken;

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/refreshToken", refreshToken);

module.exports = router;
