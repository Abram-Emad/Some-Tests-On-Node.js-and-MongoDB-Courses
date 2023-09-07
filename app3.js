const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hostname = '127.0.0.1';
const port = 7800;

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'ejs-files');

app.use(express.static(path.join(__dirname, 'statics')));

app.get('/', (req, res, next) => {
    res.render('html');
});

app.post('/', bodyParser.urlencoded({extended: true}), (req, res, next) => {
    res.render("html", {name: req.body.name, age: req.body.age});
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});