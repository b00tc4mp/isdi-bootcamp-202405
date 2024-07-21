import express from 'express'

import logic from 'cor/logic/index.js'

const api = express()

api.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    next()
})


api.get('/', (req, res) => {
    res.send('Hello, World!')
})


//registerUser

api.post('/users', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const { name, surname, email, username, password, passwordRepeat } = JSON.parse(json)

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat, error => {
                if(error) {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                    
                    return
                }
           

            res.status(201).send()

        })
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

        }
    })
})


//login

api.post('/users/auth', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const { username, password } = JSON.parse(json)

        try {
            logic.authenticateUser(username, password, error => {
                if(error){
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
                }

            res.send()

        })

        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

//getUsername

api.get('/users/:targetUsername/name', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { targetUsername } = req.params

    try {
        logic.getUserName(username, targetUsername, (error, name) => {
            if(error){
        res.status(500).json({ error: error.constructor.name, message: error.message })

        return
            }

        res.json(name)

    })

    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})


//TODO GET /posts (getAllPosts)

api.get('/posts', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    try {
       logic.getAllPosts(username, (error, posts) => {
            if(error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })


        return
            }

        res.json(posts)

    })

    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

// TODO GET /posts/ponies (getAllPoniesPosts) [Authorization: Basic username]

api.get('/posts/following', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    try{
        logic.getAllFollowingUserPosts(username, (error, posts) => {
            if(error){
        res.status(500).json({error: error.constructor.name, message: error.message})

        return
            }

        res.status(200).json(posts)
    })

    } catch(error){
        res.status(500).json({error: error.constructor.name, message: error.message})
    }
})

// TODO GET /posts/favs [Authorization: Basic username]
api.get('/posts/favs', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    try {
        logic.getAllFavPosts(username, (error, posts) => {
            if(error){
        res.status(500).json({ error: error.constructor.name, message: error.message })

        return

            }

        res.json(posts)
    })

    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})


// TODO POST /posts (createPost) [Authorization: Basic username]

api.post('/posts', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    req.setEncoding('utf-8')

    req.on('data', json => {
        const { image, caption } = JSON.parse(json)

        try {
            logic.createPost(username, image, caption, error => {
                if(error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

                }

            res.status(201).send()

        })

        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

// TODO DELETE /posts/:postId (deletePost) [Authorization: Basic username]

api.delete('/posts/:postId', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { postId } = req.params

    try {
        logic.deletePost(username, postId, error => {
            if(error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })

        return

            }

        res.status(204).send()

    })

    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})


// TODO PATCH /posts/:postId/likes (toggleLikePost) [Authorization: Basic username]

api.patch('/posts/:postId/likes', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { postId } = req.params

    try {
        logic.toggleLikePost(username, postId, error => {
            if(error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })

        return
            }

        res.status(204).send()
    })

    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})


api.patch('/posts/:postId/favs', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { postId } = req.params

    try {
        logic.toggleFavPost(username, postId, error => {
            if(error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })

        return

            }

        res.status(204).send()
    })

    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})


api.patch('/users/:targetUsername/follows', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { targetUsername } = req.params

    try {
        logic.toggleFollowUser(username, targetUsername, error => {
            if(error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })

        return
            }

        res.status(204).send()
    })

    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})
    

api.patch('/posts/:postId/caption', (req, res) => {
    const { authorization } = req.headers

    const username = authorization.slice(6)

    const { postId } = req.params

    req.setEncoding('utf-8')

    req.on('data', json => {
        const { caption } = JSON.parse(json)

        try {
            logic.updatePostCaption(username, postId, caption, error => {
                if(error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
                }

            res.status(204).send()
        })

        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})


api.listen(8080, () => console.log('server up'))

//iniciamos el servidor para que escuche en el puerto 8080

