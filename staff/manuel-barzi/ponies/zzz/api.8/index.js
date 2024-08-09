import 'dotenv/config'
import express from 'express'

import { mongoose } from 'cor'

import { cors, jsonBodyParser } from './middlewares/index.js'
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

        api.get('/users/:targetUsername/name', getUserNameHandler)

        api.get('/posts', getAllPostsHandler)

        api.get('/posts/ponies', getAllPoniesPostsHandler)

        api.get('/posts/favs', getAllFavPostsHandler)

        api.post('/posts', jsonBodyParser, createPostHandler)

        api.delete('/posts/:postId', deletePostHandler)

        api.patch('/posts/:postId/likes', toggleLikePostHandler)

        api.patch('/posts/:postId/favs', toggleFavPostHandler)

        api.patch('/users/:targetUsername/follows', toggleFollowUserHandler)

        api.patch('/posts/:postId/caption', jsonBodyParser, updatePostCaptionHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))