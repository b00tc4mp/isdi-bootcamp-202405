import 'dotenv/config'
import express from 'express'

import { mongoose } from '../cor/index.js'

import { cors, jsonBodyParser, jwtVerifier, errorHandler } from './middlewares/index.js'

import {
    authenticateUserHandler,
    createPostHandler,
    deletePostHandler,
    getAllFavPostsHandler,
    getAllFollowingUserPostsHandler,
    getAllPostsHandler,
    getUserHandler,
    getUserNameHandler,
    registerUserHandler,
    toggleFavPostHandler,
    toggleFollowUserHandler,
    toggleLikePostHandler,
    updateAvatarHandler,
    updatePasswordHandler,
    updatePostCaptionHandler,
    searchPostsHandler
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info('API connected')

        const api = express()

        api.use(cors)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.post('/posts', jwtVerifier, jsonBodyParser, createPostHandler)

        api.get('/users/:targetUserId/name', jwtVerifier, getUserNameHandler)

        api.get('/posts', jwtVerifier, getAllPostsHandler)

        api.get('/posts/ponies', jwtVerifier, getAllFollowingUserPostsHandler)

        api.get('/posts/favs', jwtVerifier, getAllFavPostsHandler)

        api.delete('/posts/:postId', jwtVerifier, deletePostHandler)

        api.patch('/posts/:postId/likes', jwtVerifier, toggleLikePostHandler)

        api.patch('/posts/:postId/favs', jwtVerifier, toggleFavPostHandler)

        api.patch('/users/:targetUserId/follows', jwtVerifier, toggleFollowUserHandler)

        api.patch('/posts/:postId/caption', jwtVerifier, jsonBodyParser, updatePostCaptionHandler)

        api.patch('/users/avatar', jwtVerifier, jsonBodyParser, updateAvatarHandler)

        api.patch('/users/password', jwtVerifier, jsonBodyParser, updatePasswordHandler)

        api.get('/users/:targetUserId/settings', jwtVerifier, getUserHandler)

        api.get('/posts/search', jwtVerifier, searchPostsHandler)

        // api.get('/colors/search', (req, res, next) => {
        //     const colors = ['red', 'green', 'blue', 'violette', 'brown', 'yellow']

        //     const { q } = req.query

        //     const filtered = colors.filter(color => color.includes(q))

        //     res.json(filtered)
        // })

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))