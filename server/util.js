const jwt = require("jsonwebtoken");

module.exports = {
    generateToken: (key) => {
        // Generating new accessToken & RefreshToken during login
        console.log(`Key value is ${JSON.stringify(key)}\n`);
        return new Promise((resolve, reject) => {
            try {
                const token = {
                    accessToken: jwt.sign(key, process.env.JWT_SECRET_TOKEN, {
                        expiresIn: "1m",
                    }),
                    refreshToken: jwt.sign(
                        key,
                        process.env.JWT_SECRET_REFRESH_TOKEN,
                        {
                            expiresIn: "7d",
                        }
                    ),
                };

                resolve(token);
            } catch (e) {
                reject(e);
            }
        });
    },
    verifyToken: async (req, res, next) => {
        // verify the accessToken is valid or not
        console.log(
            `AccessToken verification process started at verifyToken function\n`
        );
        try {
            console.log(`${JSON.stringify(req.headers)}\n`);

            console.log(`Req header auth`, req.headers["authorization"]);
            // return false;

            let token = req.headers["authorization"];
            token = token.split(" ")[1];

            console.log(`Token is ${token}\n`);

            /**
             * ToDo:
             * Step 1: Check weather the accessToken is expired or not
             * Step 2: if accessToken is expired, then check for refreshToken from request
             * Step 3: if refreshToken is not present or expired, then redirect to login page
             * Step 4: If refreshToken is present, then call refreshToken function
             */

            await jwt.verify(
                token,
                process.env.JWT_SECRET_TOKEN,
                async (err, user) => {
                    console.log(`User ${JSON.stringify(user)}`);
                    if (user) {
                        console.log(`Inside user success`);
                        req.user = user;
                        next();
                    } else if (err.message === "jwt expired") {
                        console.log(
                            `\n\n\nToken expired error caught -> ${err.message}\n\n\n`
                        );
                        return res.json({
                            success: false,
                            message: "Access token expired",
                        });
                    } else {
                        console.log(err);
                        return res
                            .status(403)
                            .json({ err, message: "user not authenticated" });
                    }
                }
            );
        } catch (e) {
            console.log("Error caught: ", e);
        }
    },
    refreshToken: (req, res) => {
        // generate new accessToken if refresh token is valid
        // otherwise prompt user to login again
        console.log(`Refresh token function started executing..`);

        const { token } = req.body;
        if (!token)
            return res.status(400).json({
                success: false,
                message: "Refresh token not found, login again",
            });

        console.info(`Refresh token is present in the request!\n`);
        // If refresh token is valid, then create & send new access token
        jwt.verify(token, process.env.JWT_SECRET_REFRESH_TOKEN, (err, user) => {
            console.info(`JWT Refresh token verification success!\n`);
            if (!err) {
                const accessToken = jwt.sign(
                    { _id: user._id },
                    process.env.JWT_SECRET_TOKEN,
                    { expiresIn: "5m" }
                );
                console.info(`accessToken Generated!`);
                return res.status(201).json({ success: true, accessToken });
            } else {
                console.info(`Error: accessToken is not generated!`);
                return res.status(400).json({
                    success: false,
                    message: "Invalid refresh token",
                });
            }
        });
    },
};
