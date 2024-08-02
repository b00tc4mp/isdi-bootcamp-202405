import 'dotenv/config'
import express from 'express'

import { mongoose } from '../cor/index.js'

import { cors, jsonBodyParser, jwtVerifier, errorHandler } from './middlewares/index.js'
import {
    authenticateUserHandler,
    createPostHandler,
    deletePostHandler,
    getAllFavPostsHandler,
    getAllPostsHandler,
    getAllPoniesPostHandler,
    getUserNameHandler,
    registerUserHandler,
    toggleFavPostHandler,
    toggleFollowUserHandler,
    toggleLikePostHandler,
    updatePostCaptionHandler
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info(`Api connectec to ${process.env.MONGODB_URI}`)

        const api = express()

        api.use(cors)

        api.get('/', (req, res) => {
            res.send('Hello, World!')
        })

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.post('/posts', jwtVerifier, jsonBodyParser, createPostHandler)

        api.get('/users/:targetUserId/name', jwtVerifier, getUserNameHandler)

        api.get('/posts', jwtVerifier, getAllPostsHandler)

        api.get('/posts/ponies', jwtVerifier, getAllPoniesPostHandler)

        api.get('/posts/favs', jwtVerifier, getAllFavPostsHandler)

        api.delete('/posts/:postId', jwtVerifier, deletePostHandler)

        api.patch('/posts/:postId/likes', jwtVerifier, toggleLikePostHandler)

        api.patch('/posts/:postId/favs', jwtVerifier, toggleFavPostHandler)

        api.patch('/users/:targetUserId/follows', jwtVerifier, toggleFollowUserHandler)

        api.patch('/posts/:postId/caption', jwtVerifier, jsonBodyParser, updatePostCaptionHandler)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.log(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))