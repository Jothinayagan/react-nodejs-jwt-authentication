const express = require("express");
const app = express();
// const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// import routes
const authRoute = require("./routes/authRoutes");
const privateRoute = require("./routes/privateRoutes");

// import middlewares from utilities
const utilities = require("./util");

const PORT = process.env.PORT || 3005;

app.use(cookieParser());
app.use(express.json());

// const corsOptions = {
//     origin: "http://localhost:3000",
//     methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST,GET");
    return res.status(200).json({ log: "If you are able to see this" });
  }

  next();
});

app.use("/api/auth", authRoute);
app.use("/api/private", utilities.verifyToken, privateRoute);

// mongoose.connect(
//     process.env.MONGO_URI,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     // () => console.log(`Database connection established successfully!`)
//     () =>
//         console.log(
//             `mongoose.connection.readyState => ${mongoose.connection.readyState}`
//         )
// );
// mongoose.connection.on("error", (err) => console.error(`Error Occurred!`, err));

app.get("/", (_req, res) => {
  res.send(`<h1>If you're able to see this, then server is started!!</h1>`);
});

app.listen(PORT, () => console.log(`Server up! PORT: ${PORT}`));
