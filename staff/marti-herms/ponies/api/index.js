import express from 'express'

import logic from 'core/logic/index.js'

const api = express()

api.use(express.json())

api.post('/users', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const { name, surname, email, username, password } = JSON.parse(json)

        try {
            logic.registerUser(name, surname, email, username, password)

            res.status(201).send()
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
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

            res.status(201).send()
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

api.get('/users/:userId/name', (req, res) => {
    const auth = req.headers.authorization

    try {
        if (!auth) throw new Error('no authorization')

        const name = JSON.stringify(logic.getUserName(req.params.userId))
        res.status(200).send(name)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/posts', (req, res) => {
    const auth = req.headers.authorization

    try {
        if (auth) {
            const posts = JSON.stringify(logic.getAllPosts(auth))
            res.status(200).send(posts)
        }
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/posts/followed', (req, res) => {
    const auth = req.headers.authorization

    try {
        if (auth) {
            const posts = JSON.stringify(logic.getFollowedUserPosts(auth))
            res.status(200).send(posts)
        }
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/posts/saved', (req, res) => {
    const auth = req.headers.authorization

    try {
        if (auth) {
            const posts = JSON.stringify(logic.getUserSavedPosts(auth))
            res.status(200).send(posts)
        }
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.post('/posts', (req, res) => {
    const auth = req.headers.authorization
    req.setEncoding('utf-8')

    if (auth) {
        req.on('data', json => {
            const { img, caption } = JSON.parse(json)

            try {
                logic.addPost(auth, img, caption)

                res.status(201).send()
            } catch (error) {
                res.send(500).json({ error: error.constructor.name, message: error.message })
            }
        })
    }
})

api.delete('/posts/:postId', (req, res) => {
    const auth = req.headers.authorization

    try {
        logic.deletePost(auth, req.params.postId)

        res.status(200).send()
    } catch (error) {
        res.send(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.patch('/posts/:postId/likes', (req, res) => {
    const auth = req.headers.authorization

    try {
        logic.togglePostLike(auth, req.params.postId)

        res.status(200).send()

    } catch (error) {
        res.send(500).json({ error: error.constructor.name, message: error.message })
    }

})

api.listen(8080, () => console.log('server listening on port 8080'))