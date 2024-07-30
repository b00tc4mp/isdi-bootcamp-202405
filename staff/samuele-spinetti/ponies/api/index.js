import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'

import { mongoose, logic } from '../cor/index.js'

import errors from '../com/errors.js'
const { NotFoundError, CredentialsError, ValidationError, DuplicityError, OwnerShipError, SessionError } = errors

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info('API connected')

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

                        jwt.sign({ sub: username }, process.env.JWT_SECRET, (error, token) => {
                            if (error) {
                                res.status(498).json({ error: SessionError.name, message: error.message })

                                return
                            }

                            res.json(token)
                        })
                    })
                } catch (error) {
                    let status = 500

                    if (error instanceof ValidationError)
                        status = 400

                    res.status(status).json({ error: error.constructor.name, message: error.message })
                }
            })
        })

        api.post('/posts', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })

                    return
                }

                const { sub: username } = payload

                req.setEncoding('utf-8')

                req.on('data', data => {
                    const { image, caption } = JSON.parse(data)

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
        })

        api.get('/users/:targetUsername/name', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })

                    return
                }

                const { sub: username } = payload

                const { targetUsername } = req.params

                try {
                    const name = logic.getUserName(username, targetUsername, (error, name) => {
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
        })

        api.get('/posts', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })

                    return
                }

                const { sub: username } = payload

                try {
                    const posts = logic.getAllPosts(username, (error, posts) => {
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
        })

        api.get('/posts/ponies', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })

                    return
                }

                const { sub: username } = payload

                try {
                    const posts = logic.getAllFollowingUserPosts(username, (error, posts) => {
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
        })

        api.get('/posts/favs', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })

                    return
                }

                const { sub: username } = payload

                try {
                    const posts = logic.getAllFavPosts(username, (error, posts) => {
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
        })

        api.delete('/posts/:postId', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })

                    return
                }

                const { sub: username } = payload

                const { postId } = req.params

                try {
                    logic.deletePost(username, postId, error => {
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404
                            else if (error instanceof OwnerShipError)
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

        api.patch('/posts/:postId/likes', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })

                    return
                }

                const { sub: username } = payload

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
        })

        api.patch('/posts/:postId/favs', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })

                    return
                }

                const { sub: username } = payload

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
        })

        api.patch('/users/:targetUsername/follows', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })

                    return
                }

                const { sub: username } = payload

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
        })

        api.patch('/posts/:postId/caption', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })

                    return
                }

                const { sub: username } = payload

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
        })

        api.patch('/users/avatar', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })

                    return
                }

                const { sub: username } = payload

                req.setEncoding('utf-8')

                req.on('data', json => {
                    const { avatar } = JSON.parse(json)

                    try {
                        logic.updateAvatar(username, avatar, error => {
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
            })
        })

        api.patch('/users/password', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })

                    return
                }

                const { sub: username } = payload

                req.setEncoding('utf-8')

                req.on('data', json => {
                    const { oldPassword, newPassword } = JSON.parse(json)

                    try {
                        logic.updatePassword(username, oldPassword, newPassword, error => {
                            if (error) {
                                let status = 500

                                if (error instanceof NotFoundError)
                                    status = 404
                                else if (error instanceof CredentialsError)
                                    status = 401

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
        })

        api.get('/users/:targetUsername/settings', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })

                    return
                }

                const { sub: username } = payload

                const { targetUsername } = req.params

                try {
                    logic.getUser(username, targetUsername, (error, user) => {
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.send(user)
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