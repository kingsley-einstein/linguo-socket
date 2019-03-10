const server = require('http').createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
});
const io = require('socket.io')(server, {origins: '*:*'});

io.origins("*:*");

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