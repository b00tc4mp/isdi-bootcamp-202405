import express from 'express'

import logic from 'core/logic/index.js'

const api = express()

// api.use(express.json())

api.options('/users', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    res.send()
})

api.post('/users', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const { name, surname, email, username, password } = JSON.parse(json)

        try {
            logic.registerUser(name, surname, email, username, password)

            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')

            res.status(201).send()
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

api.options('/users/auth', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    res.send()
})

api.post('/users/auth', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const { username, password } = JSON.parse(json)

        try {
            logic.authenticateUser(username, password)

            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')

            res.send()
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

api.options('/users/:targetUsername/name', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    res.send()
})

api.get('/users/:targetUsername/name', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { targetUsername } = req.params

    try {
        const name = logic.getUserName(username, targetUsername)

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.setHeader('Access-Control-Allow-Methods', '*')

        res.json(name)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.options('/posts', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    res.send()
})

api.get('/posts', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    try {
        const posts = logic.getAllPosts(username)

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.setHeader('Access-Control-Allow-Methods', '*')

        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.options('/posts/followed', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    res.send()
})

api.get('/posts/followed', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    try {
        const posts = logic.getFollowedUserPosts(username)

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.setHeader('Access-Control-Allow-Methods', '*')

        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.options('/posts/saved', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    res.send()
})

api.get('/posts/saved', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    try {
        const posts = logic.getUserSavedPosts(username)

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.setHeader('Access-Control-Allow-Methods', '*')

        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.options('/users/:targetUsername/posts', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    res.send()
})

api.get('/users/:targetUsername/posts', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { targetUsername } = req.params

    try {
        const posts = logic.getUserPosts(username, targetUsername)

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.setHeader('Access-Control-Allow-Methods', '*')

        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/users/:targetUsername/avatar', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { targetUsername } = req.params

    try {
        const avatar = logic.getUserAvatar(username, targetUsername)

        res.json(avatar)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }

})

api.get('/users/:targetUsername/followed', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { targetUsername } = req.params

    try {
        const followed = logic.getUserFollowed(username, targetUsername)

        res.json(followed)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/users/:targetUsername/followers', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { targetUsername } = req.params

    try {
        const followers = logic.getUserFollowers(username, targetUsername)

        res.json(followers)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/users/list', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    try {
        const userList = logic.getUserList(username)

        res.json(userList)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/users/:targetUsername/posts/number', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { targetUsername } = req.params

    try {
        const postNumber = logic.getUserPostNumber(username, targetUsername)

        res.json(postNumber)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.post('/posts', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    req.setEncoding('utf-8')

    req.on('data', json => {
        const { img, caption } = JSON.parse(json)

        try {
            logic.addPost(username, img, caption)

            res.status(201).send()
        } catch (error) {
            res.send(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

api.delete('/posts/:postId', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { postId } = req.params

    try {
        logic.deletePost(username, postId)

        res.status(204).send()
    } catch (error) {
        res.send(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.patch('/posts/:postId/likes', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { postId } = req.params

    try {
        logic.togglePostLike(username, postId)

        res.status(204).send()
    } catch (error) {
        res.send(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.patch('/posts/:postId/saved', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { postId } = req.params

    try {
        logic.toggleSavedPost(username, postId)

        res.status(204).send()
    } catch (error) {
        res.send(500).json({ error: error.constructor.name, message: error.message })
    }
})
api.patch('/posts/:targetUsername/follow', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { targetUsername } = req.params

    try {
        logic.toggleUserFollow(username, targetUsername)

        res.status(204).send()
    } catch (error) {
        res.send(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.put('/posts/:postId/caption', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { postId } = req.params

    req.on('data', json => {
        const { newCaption } = JSON.parse(json)

        try {
            logic.editPost(username, postId, newCaption)

            res.status(204).send()
        } catch (error) {
            res.send(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

api.put('/users/:targetUsername', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { targetUsername } = req.params

    req.on('data', json => {
        const { avatar, newUsername, password } = JSON.parse(json)

        try {
            if (username !== targetUsername) throw new Error('user not authorized')

            logic.editUserInfo(username, avatar, newUsername, password)

            res.status(204).send()
        } catch (error) {
            res.send(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

api.listen(8080, () => console.log('server listening on port 8080'))