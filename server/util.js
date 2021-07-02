const jwt = require("jsonwebtoken");

module.exports = {
    generateToken: (key) => {
        // Generating new accessToken & RefreshToken during login
        console.log(`Key value is ${JSON.stringify(key)}\n`);
        return new Promise((resolve, reject) => {
            try {
                const token = {
                    accessToken: jwt.sign(key, process.env.JWT_SECRET_TOKEN, {
                        expiresIn: "5m",
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
            `AccessToken verification process started at verifyToken function`
        );
        try {
            console.log(JSON.stringify(req.headers));

            let token = req.headers["authorization"];
            token = token.split(" ")[1];

            await jwt.verify(
                token,
                process.env.JWT_SECRET_TOKEN,
                async (err, user) => {
                    if (user) {
                        req.user = user;
                        next();
                    } else if (err.message === "jwt expired")
                        return res.json({
                            success: false,
                            message: "Access token expired",
                        });
                    else {
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
            return res.json({
                message: "Refresh token not found, login again",
            });

        // If refresh token is valid, then create & send new access token
        jwt.verify.verify(
            token,
            process.env.JWT_SECRET_REFRESH_TOKEN,
            (err, user) => {
                if (!err) {
                    const accessToken = jwt.sign(
                        { _id: user._id },
                        process.env.JWT_SECRET_TOKEN,
                        { expiresIn: "5m" }
                    );

                    return res.json({ success: true, accessToken });
                } else {
                    return res.json({
                        success: false,
                        message: "Invalid refresh token",
                    });
                }
            }
        );
    },
};
