const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes");

const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());
app.use(routes);

mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    // () => console.log(`Database connection established successfully!`)
    () => console.log(`mongoose.connection.readyState => ${mongoose.connection.readyState}`)
);
mongoose.connection.on("error", (err) => console.error(`Error Occurred!`, err));

app.get("/", (_req, res) =>
    res.send(`<h1>If you're able to see this, then server is started!!</h1>`)
);

app.listen(PORT, () => console.log(`Server up!`));
