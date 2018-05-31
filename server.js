
const express = require("express");
const app = express();
const socketIo = require('socket.io');
const path = require('path')
app.use(express.static(__dirname + "/public/dist/public"))

// Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Mongoose
require("./server/config/mongoose")

// Server
const portNum = 3000;
const server = app.listen(portNum, () => {
    console.log(`Listening on Port ${portNum}`);
});
const io = socketIo(server)

// Routes
require("./server/config/routes.js")(app)

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

io.on('connection', socket => {
    socket.emit('hello', {greeting: 'Hello Paul'});
});

// Sockets

// use Node Schedule to work with loading quizzes