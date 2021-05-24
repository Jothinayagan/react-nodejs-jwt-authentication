const bcrypt = require("bcryptjs");
const userModel = require("./models/user");

const loginUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
};

const signupUser = async (req, res) => {
    console.log("Signing up...");

    if (req.body.password !== req.body.confirmPassword)
        return res.status(400).send({ message: `Password doesn't match` });

    // encrypt password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    console.log(hashedPassword);

    const newUser = new userModel({
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    console.log("new user", newUser);
    // const savedUser = await newUser.save();
    // console.log("saved User", savedUser);
    // return false;
    try {
        const savedUser = await newUser.save();
        console.log("Saved user", savedUser);
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
