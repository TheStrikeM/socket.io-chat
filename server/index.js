const express = require("express")
const config = require("config")

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {cors:{origin:"*"}});


const PORT = config.get("socketPort") || 5000

app.use(express.json())
const listMessages = []

io.on('connection', (socket) => {

    console.log(`User ${socket.id} connected`)

    socket.on('GET_MESSAGES', message => {
        io.emit('GET_MESSAGES', message)
    })
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
