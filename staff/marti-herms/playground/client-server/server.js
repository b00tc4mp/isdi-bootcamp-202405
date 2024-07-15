var net = require('net');

var server = net.createServer(function (socket) {
    socket.write('Hola Manu viva españa\r\n');
    socket.pipe(socket);
});

server.listen(1337, '192.168.1.108');