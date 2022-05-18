const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let server_port = process.env.YOUR_PORT || process.env.PORT || 80;
let server_host = process.env.YOUR_HOST || '0.0.0.0';

http.listen(server_port, server_host, () => {
    console.log(`Listening on port ${server_port}`);
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log('Connected...');
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message', msg);
    })
}) 