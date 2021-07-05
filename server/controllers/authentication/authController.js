const bcrypt = require("bcryptjs");
const userModel = require("../../models/user");
const utilities = require("../../util");

const refreshToken = async (req, res) => {
    try {
        console.info(`Refreshing token started!`);
        utilities.refreshToken(req, res);
    } catch (err) {
        console.error("Error Occurred @ refreshToken:", err);
    }
};

const loginUser = async (req, res) => {
    try {
        console.info("Request Initiated @ Login function\n");

        const { email, password } = req.body;
        console.log(`Email: ${email} & Password: ${password}\n`);

        // check whether is already exists
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).send({ message: "User not exist!" });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.log("Incorrect password", password, user.password);
            return res.status(400).send({ message: "Incorrect password!" });
        }

        // jwt key generation
        const { accessToken, refreshToken } = await utilities.generateToken({
            _id: user._id,
        });
        console.log(
            `accessToken => ${accessToken} \nrefreshToken => ${refreshToken}\n`
        );

        return res.status(201).json({ accessToken, refreshToken });
    } catch (e) {
        console.log("Error caught @ loginUser controller: ", e);
    }
};

const signupUser = async (req, res) => {
    if (req.body.password !== req.body.confirmPassword)
        return res.status(400).send({ message: `Password doesn't match` });

    // Check weather user is already registered
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) return res.status(400).send("User already exist!");

    // encrypt password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    console.log(hashedPassword);

    const newUser = new userModel({
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await newUser.save();
        return res.status(200).send({
            user: savedUser._id,
            message: "New user added successfully!",
        });
    } catch (err) {
        console.log("Errored occured");
        return res.status(400).send({ error: "LOL" });
    }
};

module.exports = { refreshToken, loginUser, signupUser };
