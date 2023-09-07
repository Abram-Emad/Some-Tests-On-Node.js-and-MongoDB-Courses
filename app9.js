const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require('body-parser');
const { deserializeStream } = require("bson");

const app = express();

const hostname = '127.0.0.1';
const port = 5900;
const JWT_SECRET = "This is my small secret";

app.get('/', (req, res, next) => {
    let token = jwt.sign({
        name: "Abram",
        age: 21
    }, JWT_SECRET, {
        expiresIn: '1h'
    });
    res.json({token: token})
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWJyYW0iLCJhZ2UiOjIxLCJpYXQiOjE2NTg4NjU2OTUsImV4cCI6MTY1ODg2OTI5NX0.0Hmbwu0ECaY-_RRUNMx19Z1vDXHp9iGA5dNasSLpHc0
app.post('/', (req, res, next) => {
    let token = req.header("Authorization")
    try {
        let data = jwt.verify(token, JWT_SECRET);
        res.json(data);
    } catch (error) {
        res.json({user: false})
    }
});

console.log(new Date(1658869295000));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});