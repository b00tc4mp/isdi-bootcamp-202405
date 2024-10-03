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
    deleteEventHandler,
    updateEventDataHandler,
    getUsersByRoleHandler,
    searchEventHandler,
    toggleLikePostHandler,
    createCommentHandler,
    getAllCommentsHandler,
    deleteCommentHandler,
    createChatHandler,
    sendMessageHandler,
    getMessagesHandler,
    getEventByDateHandler,
    getUserProfileHandler,
    getUserHandler,
    updateAvatarHandler,
    updateDescriptionHandler
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

        api.patch('/events/:eventId', jwtVerifier, jsonBodyParser, updateEventDataHandler)

        api.get('/users', jwtVerifier, getUsersByRoleHandler)

        api.get('/events/search', jwtVerifier, searchEventHandler)

        api.get('/events/by-date/:date', jwtVerifier, getEventByDateHandler)

        api.patch('/posts/:postId/likes', jwtVerifier, toggleLikePostHandler)

        api.post('/comments/:postId', jwtVerifier, jsonBodyParser, createCommentHandler)

        api.get('/posts/:postId/comments', jwtVerifier, getAllCommentsHandler)

        api.delete('/comments/:commentId', jwtVerifier, deleteCommentHandler)

        api.post('/chats', jwtVerifier, jsonBodyParser, createChatHandler)

        api.post('/chats/:chatId/messages', jwtVerifier, jsonBodyParser, sendMessageHandler)

        api.get('/chats/:chatId/messages', jwtVerifier, getMessagesHandler)

        api.get('/users/profile', jwtVerifier, getUserProfileHandler)

        api.get('/users/:targetUserId', jwtVerifier, getUserHandler)

        api.patch('/users/avatar', jwtVerifier, jsonBodyParser, updateAvatarHandler)

        api.patch('/users/description', jwtVerifier, jsonBodyParser, updateDescriptionHandler)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))
