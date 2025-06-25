const http= require("http");
const express = require("express");
const path= require('path');
const {Server} = require("socket.io");
const { isKeyObject } = require("util/types");
const { log } = require("console");


const app= express();
const server= http.createServer(app);
const io = new Server(server)

//socket io

io.on("connection", (socket) =>{

    socket.on('u_message', (message)=>{

        console.log("Message:",message);
        io.emit("message", message)
        
    })
    
})

app.use(express.static(path.resolve('./public')))

app.get("/", (req, res) =>{

    return res.sendFile("./Public/index.html")
})

server.listen(9000, ()=> console.log(`Server started at http://localhost:9000`))