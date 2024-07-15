// Express -> marco de trabajo para construir aplicaciones web y APIs en node.js. Facilita la creacion de servidores y el manejo de solicitudes HTTP
import express from 'express'
import logic from './logic/index.js'

const api = express() // Se crea una instancia de una aplicacion express, esta instancia se usará para configurar nuestras rutas y manejar las solicitudes HTTP.

api.use(express.json())

api.post('/register/user', (req, res) => {
    const { name, surname, email, username, password, passwordRepeat } = req.body

    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat)

        res.send('all correct')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

api.get('/hello', (req, res) => {
    //aqui se define una ruta GET en '\hello' para que el servidor responda con Hello, World!' cuando alguien acceda a '\hello'. 
    //req (request)-> objeto de solicitud que contiene info sobre la solicitud HTTP.
    //res (response) -> objeto de respuesta que usamos para enviar una respuesta al cliente.
    res.send('Hello, World!') //se envia la respuesta 'Hello, World!'
})

api.listen(8080, () => console.log('server up')) // se inicia el servidor
