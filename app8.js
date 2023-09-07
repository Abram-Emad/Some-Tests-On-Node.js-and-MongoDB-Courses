const express = require("express");
const bodyParser = require('body-parser');

const app = express();

const hostname = '127.0.0.1';
const port = 4500;

app.get('/', (req, res, next) => {
    res.json({
        name: "Abram",
        age: 21
    })
});

app.post('/', bodyParser.json(), (req, res, next) => {
    console.log(req.body);
    res.json(req.body)
});

app.delete('/', (req, res, next) => {
    console.log("deleted");
    res.json({})
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});