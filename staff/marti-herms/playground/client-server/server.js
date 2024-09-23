const net = require('net')

const sockets = []

const server = net.createServer(socket => {
    sockets.push(socket)

    socket.on('data', data => {
        console.log(data.toString(), new Date)

        sockets.forEach(socket => socket.write(data.toString()))
    })

    socket.on('close', () => {
        const index = sockets.findIndex(_socket => _socket === socket)

        sockets.splice(index, 1)
    })
})

const host = '127.0.0.1'
// const host = '192.168.1.117'

server.listen(1337, host, () => console.log('server is up'))