const bcrypt = require("bcryptjs");
const userModel = require("./models/user");

const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // check whether is already exists
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("User already exist!");

    const isValidPassword = await bcrypt.compare(password, user.password);
    // if (!isValidPassword) return res.status(400).send("Incorrect password!");
    isValidPassword ? console.log("Valid user") : console.log("invalid User");
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

module.exports = { loginUser, signupUser };
