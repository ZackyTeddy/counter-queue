const express = require('express');
const app = express()
const http = require('http')
const cors = require('cors');
const { Server } = require('socket.io')
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","PUT"],
    }
})

io.on('connection', (socket) => {
    console.log("Connected as" + socket.id);

    socket.on("status-change", (data) => {
        socket.broadcast.emit("status-received", data)
    })

    socket.on("queue-change", (data) => {
        socket.broadcast.emit("queue-received", data)
    })

    socket.on("current-change", (data) => {
        socket.broadcast.emit("current-received", data)
    })

    socket.on("disconnect", () => {
        console.log("App disconnected")
    })
})

server.listen(3001, () => {
    console.log("SERVER IS LIVE!")
})
