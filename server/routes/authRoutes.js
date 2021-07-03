const router = require("express").Router();

const authController = require("../controllers/authentication/authController");

const loginUser = authController.loginUser;
const signupUser = authController.signupUser;

router.post("/login", loginUser);
router.post("/signup", signupUser);

module.exports = router;
