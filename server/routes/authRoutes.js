const router = require("express").Router();

const authController = require("../controllers/authentication/auth");
// const refreshTokenController = require("../controllers/authentication/refreshToken");

const loginUser = authController.loginUser;
const signupUser = authController.signupUser;

router.post("/login", loginUser);
router.post("/signup", signupUser);

module.exports = router;
