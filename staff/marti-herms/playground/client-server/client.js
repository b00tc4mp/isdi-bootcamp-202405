const { Socket } = require('net')

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');


const socket = new Socket()

// const host = '127.0.0.1'
const host = '192.168.1.112'

socket.connect(1337, host, () => {
    console.log('connected to server')

    const rl = readline.createInterface({ input, output });

    rl.question('Who? ', who => {
        function loop() {
            rl.question('', what => {
                if (what === 'stop') {
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

socket.on('data', (data) => console.log(data.toString(), new Date))

socket.on('close', () => console.log('Connection closed'))