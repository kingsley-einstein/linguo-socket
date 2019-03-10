const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const server = require('http').createServer(app);
const io = require('socket.io')(server, {origins: '*:*'});

io.on('connection', (socket) => {
    console.log(`Connected to socket with id ${socket.id}`);
    socket.on('SEND_MESSAGE', (data) => {
        console.log(data);
        io.emit('MESSAGE', data);
    });
});


server.listen(process.env.PORT || 4800, () => {
    console.log(`Server running on ${process.env.PORT}`);
});