import 'dotenv/config'
import express from 'express'

import { mongoose, logic } from 'cor'

import { errors } from 'com'

const { ValidationError, DuplicityError, NotFoundError, CredentialsError, OwnershipError } = errors

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info(`API connected to ${process.env.MONGODB_URI}`)

        const api = express()

        api.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')

            next()
        })

        api.get('/', (req, res) => {
            res.send('Hello, World!')
        })

        api.post('/users', (req, res) => {
            req.setEncoding('utf-8')

            req.on('data', json => {
                const { name, surname, email, username, password, passwordRepeat } = JSON.parse(json)

                try {
                    logic.registerUser(name, surname, email, username, password, passwordRepeat, error => {
                        if (error) {
                            let status = 500

                            if (error instanceof DuplicityError)
                                status = 409

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.status(201).send()
                    })
                } catch (error) {
                    let status = 500

                    if (error instanceof ValidationError)
                        status = 400

                    res.status(status).json({ error: error.constructor.name, message: error.message })
                }
            })
        })

        api.post('/users/auth', (req, res) => {
            req.setEncoding('utf-8')

            req.on('data', json => {
                const { username, password } = JSON.parse(json)

                try {
                    logic.authenticateUser(username, password, error => {
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404
                            else if (error instanceof CredentialsError)
                                status = 401

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.send()
                    })
                } catch (error) {
                    let status = 500

                    if (error instanceof ValidationError)
                        status = 400

                    res.status(status).json({ error: error.constructor.name, message: error.message })
                }
            })
        })

        api.get('/users/:targetUsername/name', (req, res) => {
            const { authorization } = req.headers

            const username = authorization.slice(6)

            const { targetUsername } = req.params

            try {
                logic.getUserName(username, targetUsername, (error, name) => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(name)
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/posts', (req, res) => {
            const { authorization } = req.headers

            const username = authorization.slice(6)

            try {
                logic.getAllPosts(username, (error, posts) => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(posts)
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/posts/ponies', (req, res) => {
            const { authorization } = req.headers

            const username = authorization.slice(6)

            try {
                logic.getAllPoniesPosts(username, (error, posts) => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(posts)
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/posts/favs', (req, res) => {
            const { authorization } = req.headers

            const username = authorization.slice(6)

            try {
                logic.getAllFavPosts(username, (error, posts) => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(posts)
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.post('/posts', (req, res) => {
            const { authorization } = req.headers

            const username = authorization.slice(6)

            req.setEncoding('utf-8')

            req.on('data', json => {
                const { image, caption } = JSON.parse(json)

                try {
                    logic.createPost(username, image, caption, error => {
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.status(201).send()
                    })
                } catch (error) {
                    let status = 500

                    if (error instanceof ValidationError)
                        status = 400

                    res.status(status).json({ error: error.constructor.name, message: error.message })
                }
            })
        })

        api.delete('/posts/:postId', (req, res) => {
            const { authorization } = req.headers

            const username = authorization.slice(6)

            const { postId } = req.params

            try {
                logic.deletePost(username, postId, error => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404
                        else if (error instanceof OwnershipError)
                            status = 403

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(204).send()
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.patch('/posts/:postId/likes', (req, res) => {
            const { authorization } = req.headers

            const username = authorization.slice(6)

            const { postId } = req.params

            try {
                logic.toggleLikePost(username, postId, error => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(204).send()
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.patch('/posts/:postId/favs', (req, res) => {
            const { authorization } = req.headers

            const username = authorization.slice(6)

            const { postId } = req.params

            try {
                logic.toggleFavPost(username, postId, error => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(204).send()
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.patch('/users/:targetUsername/follows', (req, res) => {
            const { authorization } = req.headers

            const username = authorization.slice(6)

            const { targetUsername } = req.params

            try {
                logic.toggleFollowUser(username, targetUsername, error => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(204).send()
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
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
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404
                            else if (error instanceof OwnershipError)
                                status = 403

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.status(204).send()
                    })
                } catch (error) {
                    let status = 500

                    if (error instanceof ValidationError)
                        status = 400

                    res.status(status).json({ error: error.constructor.name, message: error.message })
                }
            })
        })

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))
