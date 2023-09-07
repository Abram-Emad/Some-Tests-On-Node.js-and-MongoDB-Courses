const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);

const hostname = '127.0.0.1';
const port = 4700;

io.on("connection", socket => {
    console.log("new user is connected");
    socket.on("sendMsg", (p1, p2) => {
        console.log(p1, p2);
        socket.emit("EventRecvied");
    });
});

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'html2.html'));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});