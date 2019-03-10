const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log(`Connected to socket with id ${socket.id}`);
    socket.on('SEND_MESSAGE', (data) => {
        console.log(data);
        io.emit('MESSAGE', data);
    });
});


server.listen(4800, () => {
    console.log('Server running on port 4800');
});