const net = require('net') //para crear un servicio TCP

let sockets = []

 const server = net.createServer(socket => { //se crea servidor TCP
    sockets.push(socket)

    socket.on('data', data => {
        console.log(data.toString(), new Date)

        sockets.forEach(socket => socket.write(data.toString()))
    })

    socket.on('close', () => {

   //TODO

       //sockets = sockets.filter(client => client !== socket)

       const index= sockets.findIndex(client => client === socket)
       if(index > -1)
        sockets.splice(index,1)
    })
 })

 const host= '192.168.1.174'

 server.listen(1337, host, () => console.log('server is up'))

 //socket: interfax que permite comunicacion entre 2 nodos de una red