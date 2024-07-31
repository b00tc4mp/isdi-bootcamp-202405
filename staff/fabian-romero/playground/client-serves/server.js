const net = require('net')

let sockets = []

const server = net.createServer(socket => {
    sockets.push(socket)

    socket.on('data', data => {
        console.log(data.toString(), new Date)

        sockets.forEach(socket => socket.write(data.toString()))
    })

    socket.on('close', data => {

        // const index = sockets.indexOf(socket)
        // if(index !== 1) {
        //     sockets.splice(index, 1)
        // }

        console.log(data.toString())

        sockets = sockets.filter(client => client !== socket)

    })
})

const host = '192.168.1.124'

server.listen(1337, host, () => console.log('server is up'))