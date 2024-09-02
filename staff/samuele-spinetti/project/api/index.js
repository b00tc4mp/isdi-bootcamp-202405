import 'dotenv/config'
import express from 'express'
import { CronJob as cron } from 'cron'

import randomQuery from '../app/util/randomQuery.js'

import { logic } from '../cor/index.js'

import { mongoose } from '../cor/index.js'

import { cors, jsonBodyParser, jwtVerifier, errorHandler } from './middlewares/index.js'

import {
    authenticateUserHandler,
    registerUserHandler,
    getUserHandler,
    updateAvatarHandler,
    updatePasswordHandler,
    getAllHCPsHandler,
    searchHCPHandler,
    toggleSaveNewsHandler,
    getAllSavedNewsHandler,
    createPostHandler,
    getAllPostsHandler,
    deletePostHandler,
    toggleLikePostHandler,
    createCommentHandler,
    getAllCommentsHandler,
    deleteCommentHandler,
    getAllNewsHandler,
    getPostCommentsHandler,
    createChatHandler,
    sendMessageHandler,
    getChatMessagesHandler,
    getAllChatsHandler,
    getChatParticipantHandler
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        const api = express()

        api.use(cors)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.post('/posts', jwtVerifier, jsonBodyParser, createPostHandler)

        api.post('/comments/:postId', jwtVerifier, jsonBodyParser, createCommentHandler)

        api.post('/chat/:targetUserId', jwtVerifier, createChatHandler)

        api.post('/:chatId/message', jwtVerifier, jsonBodyParser, sendMessageHandler)

        api.get('/users/:targetUserId', jwtVerifier, getUserHandler)

        api.get('/healthcareproviders', jwtVerifier, getAllHCPsHandler)

        api.get('/healthcareproviders/search', jwtVerifier, searchHCPHandler)

        api.get('/news', jwtVerifier, getAllNewsHandler)

        api.get('/news/saved', jwtVerifier, getAllSavedNewsHandler)

        api.get('/posts', jwtVerifier, getAllPostsHandler)

        api.get('/comments/:postId', jwtVerifier, getAllCommentsHandler)

        api.get('/:postId/comments', jwtVerifier, getPostCommentsHandler)

        api.get('/:targetUserId/messages', jwtVerifier, getChatMessagesHandler)

        api.get('/chats', jwtVerifier, getAllChatsHandler)

        api.get('/chats/:chatId', jwtVerifier, getChatParticipantHandler)

        api.patch('/users/avatar', jwtVerifier, jsonBodyParser, updateAvatarHandler)

        api.patch('/users/password', jwtVerifier, jsonBodyParser, updatePasswordHandler)

        api.patch('/news/:newsId/save', jwtVerifier, toggleSaveNewsHandler)

        api.patch('/posts/:postId/likes', jwtVerifier, toggleLikePostHandler)

        api.delete('/posts/:postId', jwtVerifier, deletePostHandler)

        api.delete('/comments/:commentId', jwtVerifier, deleteCommentHandler)

        new cron(
            '*/5 * * * *',
            () => {

                console.log('news at ' + new Date(Date.now()))

                const query = randomQuery()

                try {
                    logic.getNews(query)
                        .catch(error => console.error(error))

                } catch (error) {
                    console.error(error)
                }
            },
            null,
            true,
            'Europe/Madrid'
        )

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))