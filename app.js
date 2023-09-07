/*
const http = require('http');
let title = require('./modules')
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    if (req.url === '/first') {
        res.write(title.titleOne);
    }
    else if (req.url === '/') {
        res.write(title.titleTwo);
    };
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
*/
const express = require('express');
let title = require('./modules')
const hostname = '127.0.0.1';
const port = 3000;

const app = express();
const routerModules = require('./router-modules');

app.get('/', (req, res, next) => {
    res.send(title.titleTwo)
});

app.all('/first', (req, res, next) => {
    res.send(title.titleOne)
});

app.use('/about', routerModules);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});