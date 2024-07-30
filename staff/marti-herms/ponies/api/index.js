import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'

import { mongoose, logic } from 'core'

import { errors } from 'com'

const { DuplicityError, ValidationError, NotFoundError, CredentialsError, OwnershipError, OutOfBoundsError, SessionError } = errors

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`API connected to ${process.env.MONGODB_URI}`)

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
                const { name, surname, email, username, password } = JSON.parse(json)

                try {
                    logic.registerUser(name, surname, email, username, password, (error) => {
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
                    logic.authenticateUser(username, password, (error) => {
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404

                            if (error instanceof CredentialsError)
                                status = 409

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        jwt.sign({ sub: username }, process.env.JWT_SECRET, (error, token) => {
                            if (error) {
                                res.status(498).json({ error: SessionError.name, message: error.message })
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

        api.get('/users/:targetUsername/name', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    const { targetUsername } = req.params

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
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/posts', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

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
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/posts/followed', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    logic.getFollowedUserPosts(username, (error, posts) => {
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.json(posts)
                    })
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/posts/saved', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    logic.getUserSavedPosts(username, (error, posts) => {
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.json(posts)
                    })
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/users/:targetUsername/posts', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    const { targetUsername } = req.params

                    logic.getUserPosts(username, targetUsername, (error, posts) => {
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.json(posts)
                    })
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/users/list', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    logic.getUserList(username, (error, userList) => {
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.json(userList)
                    })
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/users/:targetUsername', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    const { targetUsername } = req.params

                    logic.getUser(username, targetUsername, (error, user) => {
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.json(user)
                    })
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.post('/posts', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    req.setEncoding('utf-8')

                    req.on('data', json => {
                        const { img, caption } = JSON.parse(json)

                        logic.createPost(username, img, caption, (error) => {
                            if (error) {
                                let status = 500

                                if (error instanceof NotFoundError)
                                    status = 404

                                res.status(status).json({ error: error.constructor.name, message: error.message })

                                return
                            }

                            res.status(201).send()
                        })
                    })
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })


        api.delete('/posts/:postId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    const { postId } = req.params

                    logic.deletePost(username, postId, (error) => {
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404

                            if (error instanceof OwnershipError)
                                status = 403

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.status(204).send()
                    })
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.patch('/posts/:postId/likes', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    const { postId } = req.params

                    logic.togglePostLike(username, postId, (error) => {
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.status(204).send()
                    })
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.patch('/posts/:postId/saved', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    const { postId } = req.params

                    logic.toggleSavedPost(username, postId, (error) => {
                        if (error) {
                            let status = 500

                            if (error instanceof NotFoundError)
                                status = 404

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.status(204).send()
                    })
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })
        api.patch('/posts/:targetUsername/follow', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    const { targetUsername } = req.params

                    logic.toggleUserFollow(username, targetUsername, (error) => {
                        if (error) {
                            let status = 500 // CorruptedInfoError

                            if (error instanceof NotFoundError)
                                status = 404

                            if (error instanceof OutOfBoundsError)
                                status = 403

                            res.status(status).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.status(204).send()
                    })
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.patch('/posts/:postId/caption', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    const { postId } = req.params

                    req.on('data', json => {
                        const { newCaption } = JSON.parse(json)

                        logic.editPost(username, postId, newCaption, (error) => {
                            if (error) {
                                let status = 500

                                if (error instanceof NotFoundError)
                                    status = 404

                                if (error instanceof OwnershipError)
                                    status = 403

                                res.status(status).json({ error: error.constructor.name, message: error.message })

                                return
                            }

                            res.status(204).send()
                        })
                    })
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }

        })

        api.patch('/users/:targetUsername/username', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    const { targetUsername } = req.params

                    req.on('data', json => {
                        const { newUsername, password } = JSON.parse(json)

                        if (username !== targetUsername) throw new Error('user not authorized')

                        logic.editUserUsername(username, newUsername, password, (error) => {
                            if (error) {
                                let status = 500

                                if (error instanceof NotFoundError)
                                    status = 404

                                if (error instanceof CredentialsError)
                                    status = 409

                                if (error instanceof DuplicityError)
                                    status = 409

                                res.status(status).json({ error: error.constructor.name, message: error.message })

                                return
                            }

                            jwt.sign({ sub: newUsername }, process.env.JWT_SECRET, (error, token) => {
                                if (error) {
                                    res.status(498).json({ error: SessionError.name, message: error.message })
                                }

                                res.status(204).json(token)
                            })
                        })
                    })
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.patch('/users/:targetUsername/avatar', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                    if (error) {
                        res.status(498).json({ error: SessionError.name, message: error.message })
                    }

                    const { sub: username } = payload

                    const { targetUsername } = req.params

                    req.on('data', json => {
                        const { avatar } = JSON.parse(json)

                        if (username !== targetUsername) throw new Error('user not authorized')

                        logic.editUserAvatar(username, avatar, (error) => {
                            if (error) {
                                let status = 500

                                if (error instanceof NotFoundError)
                                    status = 404

                                res.status(status).json({ error: error.constructor.name, message: error.message })

                                return
                            }

                            res.status(204).send()
                        })
                    })
                })
            } catch (error) {
                let status = 500

                if (error instanceof ValidationError)
                    status = 400

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))