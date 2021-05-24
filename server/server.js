const express = require("express");
const app = express();

const PORT = process.env.PORT || 3004;

app.use(express.json());

app.get("/", (_req, res) =>
    res.send(`<h1>If you're able to see this texts, then server is started!!</h1>`)
);

app.listen(PORT, () => console.log(`Server up!`));
