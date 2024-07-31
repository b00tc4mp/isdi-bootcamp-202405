import 'dotenv/config'
import express from 'express'

import { mongoose } from 'cor'

import { cors, jsonBodyParser, jwtVerifier, errorHandler } from './middlewares/index.js'
import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    getAllPostsHandler,
    getAllPoniesPostsHandler,
    getAllFavPostsHandler,
    createPostHandler,
    deletePostHandler,
    toggleLikePostHandler,
    toggleFavPostHandler,
    toggleFollowUserHandler,
    updatePostCaptionHandler
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info(`API connected to ${process.env.MONGODB_URI}`)

        const api = express()

        api.use(cors)

        api.get('/', (req, res) => {
            res.send('Hello, World!')
        })

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUsername/name', jwtVerifier, getUserNameHandler)

        api.get('/posts', jwtVerifier, getAllPostsHandler)

        api.get('/posts/ponies', jwtVerifier, getAllPoniesPostsHandler)

        api.get('/posts/favs', jwtVerifier, getAllFavPostsHandler)

        api.post('/posts', jwtVerifier, jsonBodyParser, createPostHandler)

        api.delete('/posts/:postId', jwtVerifier, deletePostHandler)

        api.patch('/posts/:postId/likes', jwtVerifier, toggleLikePostHandler)

        api.patch('/posts/:postId/favs', jwtVerifier, toggleFavPostHandler)

        api.patch('/users/:targetUsername/follows', jwtVerifier, toggleFollowUserHandler)

        api.patch('/posts/:postId/caption', jwtVerifier, jsonBodyParser, updatePostCaptionHandler)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))