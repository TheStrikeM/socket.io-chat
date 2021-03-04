import config from "config"
import express from "express"
import cors from 'cors'
import http from 'http'
import socket from 'socket.io'


const httpServer = http.Server(app)
const io = socket(httpServer)

const PORT = config.get("socketPort") || 5000
const app = express()

app.use(express.json())
   .use(cors())

io.on('connection', (socket) => {

    console.log(`User ${socket.id} connected`)

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
})

httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`))
