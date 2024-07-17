import express from 'express'

import logic from 'cor/logic/index.js'

const api = express()

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
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

// TODO POST /users/auth (authenticateUser)
// TODO GET /users/:userId/name (getUserName) [Authorization: Basic username]
// TODO GET /posts (getAllPosts) [Authorization: Basic username]
// TODO GET /posts/ponies (getAllPoniesPosts) [Authorization: Basic username]
// TODO GET /posts/favs [Authorization: Basic username]
// TODO POST /posts (createPost) [Authorization: Basic username]
// TODO DELETE /posts/:postId (deletePost) [Authorization: Basic username]
// TODO PATCH /posts/:postId/likes (toggleLikePost) [Authorization: Basic username]


api.listen(8080, () => console.log('API is up'))