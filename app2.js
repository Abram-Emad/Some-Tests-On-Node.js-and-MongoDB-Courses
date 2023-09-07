/*
const http = require('http');
const body = require('body/form');
const hostname = '127.0.0.1';
const port = 8800;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    if (req.method === 'GET') {
        res.write('<form action="/" method="POST">');
        res.write('<input name="username">');
        res.write('<input name="age">');
        res.write('<input type="submit"');
        res.write('<form>');
    }
    else if (req.method === 'POST') {
        body(req, (err, body) => {
            console.log(body);
            res.end("Done");
        })
        
    };
//     else if (req.method === 'POST') {
//         let body = [];
//         req.on('data', (pushing) => {
//             body.push(pushing);
//         });
//         req.on('end', () => {
//             body = Buffer.concat(body).toString();
//             console.log(body);
//         });
//         res.end("Done");
//     }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
*/

/*
const express = require('express');
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const port = 8800;

const app = express();
const bodyParserMw = bodyParser.urlencoded({
    extended: true
});

app.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<form action="/" method="POST">');
    res.write('<input name="username">');
    res.write('<input name="age">');
    res.write('<input type="submit"');
    res.write('<form>');
});

app.post('/', bodyParserMw, (req, res, next) => {
    console.log(req.body.username);
    res.end("Done");
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
*/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hostname = '127.0.0.1';
const port = 8800;

const app = express();
const bodyParserMw = bodyParser.urlencoded({
    extended: true
});

app.use(express.static(path.join(__dirname, 'statics')));

app.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.post('/', bodyParserMw, (req, res, next) => {
    console.log(req.body.username);
    res.end("Done");
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});