const express = require('express')
const app = express()
const path = require('path')
const http = require('http');
const {Server} = require('socket.io');


app.use(express.static(path.join(__dirname, "..", "public")))
const serverHttp = http.createServer(app); 
const io = new Server(serverHttp)

module.exports  = {io, serverHttp}