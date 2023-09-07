const express = require("express");
const bodyParser = require('body-parser');

const app = express();

const hostname = '127.0.0.1';
const port = 6500;

app.get('/', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization");
    next();
});

app.get('/', (req, res, next) => {
    res.json({
        name: "Abram",
        age: 21
    })
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});