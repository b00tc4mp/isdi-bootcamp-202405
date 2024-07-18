import express from 'express'

import logic from 'cor/logic/index.js'

const api = express()

api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    next()
})

api.post('/users', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const { name, surname, email, username, password, passwordRepeat } = JSON.parse(json)

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat)

            res.status(201).send()
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

// POST Authentication path /users/auth
api.post('/users/auth', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const { username, password } = JSON.parse(json)

        try {
            logic.authenticateUser(username, password)

            res.send()
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

// GET /GetAllPosts/ using username & user.username
api.get('/users/:targetUsername/name', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { targetUsername } = req.params

    try {
        const name = logic.getUserName(username, targetUsername)

        res.json(name)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

// GET /posts/ (getAllPosts) [Authorization: Basic username]
api.get('/posts', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    try {
        const posts = logic.getAllPosts(username)

        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

// GET /posts/ponies (getAllPoniesPosts) [Authorization: Basic username]
api.get('/posts/ponies', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    try {
        const posts = logic.getAllPoniesPosts(username)

        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})


// GET /posts/favs (getAllFavPosts) [Authorization: Basic username]
api.get('/posts/favs', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    try {
        const posts = logic.getAllFavPosts(username)

        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

// POST /posts (createPost) [Authorization: Basic username]
api.post('/posts', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    req.setEncoding('utf-8')

    req.on('data', json => {
        const { image, caption } = JSON.parse(json)

        try {
            logic.createPost(username, image, caption)

            res.status(201).send()
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

// DELETE /posts/:postId (deletePost)
api.delete('/posts/:postId', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { postId } = req.params

    try {
        logic.deletePost(username, postId)

        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

// PATCH /posts/:postId/likes
api.patch('/posts/:postId/likes', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { postId } = req.params

    try {
        logic.toggleLikePost(username, postId)

        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.patch('/posts/:postId/favs', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { postId } = req.params

    try {
        logic.toggleFavPost(username, postId)

        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.patch('/users/:targetUsername/follows', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { targetUsername } = req.params

    try {
        logic.toggleFollowUser(username, targetUsername)

        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.listen(8080, () => console.log('API is up'))