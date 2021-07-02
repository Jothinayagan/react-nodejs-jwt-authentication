const router = require("express").Router();

const authController = require("./controllers/authentication/auth");
const refreshTokenController = require("./controllers/authentication/refreshToken");

const loginUser = authController.loginUser;
const signupUser = authController.signupUser;
const refreshToken = refreshTokenController.refreshToken;

router.post("/api/auth/login", loginUser);
router.post("/api/auth/signup", signupUser);

module.exports = router;
