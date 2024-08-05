const { Socket } = require('net')
const readline = require('node:readline')
const {stdin: input, stdout: output} = require('node:process')

const socket = new Socket()

const host = '192.168.1.117' //IP del host al cual se conectará el cliente

socket.connect(1337, host, () => {
    console.log('connected to server') //conectamos con el servidor en el puerto 1337

    const rl = readline.createInterface({input, output})

    rl.question('who? ', who => {
        function loop() {
            rl.question('', what => {
                if (what === 'stop'){
                    rl.close()

                    socket.destroy()

                    return
                }

                socket.write(`${who}: ${what}`)

                setTimeout(() => loop(), 100)
                })
        }

        loop()
    })
})

socket.on('data', data => console.log(new Date, data.toString()))

socket.on('close', () => console.log('connection closed'))