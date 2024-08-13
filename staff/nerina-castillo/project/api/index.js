import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { mongoose } from '../cor/index.js'

import { jsonBodyParser, jwtVerifier, errorHandler } from './middlewares/index.js'

import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    createPostHandler,
    getAllPostsHandler,
    searchItemsHandler,
    toggleFollowUserHandler,
    getAllFollowingUserPostsHandler,
    deletePostHandler,
    createEventHandler,
    getAllEventsHandler,
    deleteEventHandler
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info(`API connected to ${process.env.MONGODB_URI}`)

        const api = express()

        api.use(cors())

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId/name', jwtVerifier, getUserNameHandler)

        api.post('/posts', jwtVerifier, jsonBodyParser, createPostHandler)

        api.get('/posts', jwtVerifier, getAllPostsHandler)

        api.get('/posts/search', jwtVerifier, searchItemsHandler)

        api.patch('/users/:targetUserId/follows', jwtVerifier, toggleFollowUserHandler)

        api.get('/posts/following', jwtVerifier, getAllFollowingUserPostsHandler)

        api.delete('/posts/:postId', jwtVerifier, deletePostHandler)

        api.post('/events', jwtVerifier, jsonBodyParser, createEventHandler)

        api.get('/events', jwtVerifier, getAllEventsHandler)

        api.delete('/events/:eventId', jwtVerifier, deleteEventHandler)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))
