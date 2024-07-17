// Express -> marco de trabajo para construir aplicaciones web y APIs en node.js. Facilita la creacion de servidores y el manejo de solicitudes HTTP
import express from 'express'
import logic from 'cor/logic/index.js'


const api = express() // Se crea una instancia de una aplicacion express, esta instancia se usará para configurar nuestras rutas y manejar las solicitudes HTTP.

api.get('/hello', (req, res) => {
    res.send('Hello, World!')
})

api.post('/users', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const { name, surname, email, username, password, passwordRepeat } = JSON.parse(json)

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat)

            res.status(201).send()
        } catch (error) {
            res.status(500).send({ error: error.constructor.name, message: error.message })
        }
    })
})

api.post('/users/auth', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const { username, password } = JSON.parse(json)

        try {
            logic.authenticateUser(username, password)

            res.setHeader('Authorization', `Basic ${username}`)

            res.status(200).send('ok')
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

api.get('/users/:username/name', (req, res) => {
    req.setEncoding('utf-8')

    const { username } = req.params

    const { authorization } = req.headers

    const user = logic.getUser(username)

    try {
        if (!authorization || user.username !== authorization.split(' ')[1]) throw new Error('no authorization')

        const name = logic.getUserName(username)

        res.status(200).send(name)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/posts', (req, res) => {
    req.setEncoding('utf-8')

    const { authorization } = req.headers

    const author = authorization.split(' ')[1]

    try {
        const user = logic.getUser(author)

        if (!authorization || user.username !== author) throw new Error('no authorization')

        const posts = logic.getAllPosts(user.username)

        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/posts/ponies', (req, res) => {
    req.setEncoding('utf-8')

    const { authorization } = req.headers

    const author = authorization.split(' ')[1]

    try {
        const user = logic.getUser(author)

        if (!authorization || user.username !== author) throw new Error('no authorization')

        const ponies = logic.getAllPoniesPosts(user.username)

        res.status(200).json({ ponies })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/posts/favs', (req, res) => {
    req.setEncoding('utf-8')

    const { authorization } = req.headers

    const author = authorization.split(' ')[1]

    try {
        const user = logic.getUser(author)

        if (!authorization || user.username !== author) throw new Error('no authorizate')

        const favs = logic.getAllFavPosts(user.username)

        res.status(200).json({ favs })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.post('/posts', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const { username, image, caption } = JSON.parse(json)

        const { authorization } = req.headers

        const author = authorization.split(' ')[1]

        try {
            const user = logic.getUser(author)

            if (!authorization || user.username !== author) throw new Error('no authorizate')

            const post = logic.createPost(username, image, caption)

            res.status(200).json({ post })
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})





api.listen(8080, () => console.log('API is up'))
