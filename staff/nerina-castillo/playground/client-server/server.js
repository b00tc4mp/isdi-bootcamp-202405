const net = require('net')

const sockets = []

const server = net.createServer(socket => {
    sockets.push(socket)

    socket.on('data', data => {
        console.log(data.toString(), new Date)

        sockets.forEach(socket => socket.write(data.toString()))
    })

    socket.on('close', () => {
        // TODO clean socket from array of sockets

        const index = sockets.findIndex(client => client === socket)
        if(index > -1)
            sockets.splice(index, 1, socket)
    })
})

const host = '127.0.0.1'

server.listen(1337, host, () => console.log('server is up'))