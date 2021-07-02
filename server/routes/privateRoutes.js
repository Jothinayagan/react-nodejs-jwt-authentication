const router = require("express").Router();

const userDetailsController = require("../controllers/private/userDetails");
const user = require("../models/user");

router.get("/getUser", userDetailsController.getUserDetails);

module.exports = router;
