import 'dotenv/config'
import express from 'express'

import { mongoose } from 'cor'

import { cors, jsonBodyParser, jwtVerifier, errorHandler } from './middlewares/index.js'
import {
    authenticateUserHandler,
    registerInvestorHandler,
    registerProjectHandler,
    getUserNameHandler,
    getUserHandler,
    createChatHandler,
    sendMessageHandler,
    getChatMessagesHandler,
    getChatParticipantHandler,
    getAllChatsHandler,
    getAllProjectsHandler,
    getAllInvestorsHandler,
    getAllMatchsHandler,
    getLikeUsersHandler,
    deleteUserByIdHandler,
    toggleLikeUserHandler,
    toggleDislikeUserHandler,
    toggleFavUserHandler,
    updateDescriptionHandler,
    updateAvatarHandler,
    updatePasswordHandler,
    updateImageHandler,
    searchUserHandler,
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info(`API connected to ${process.env.MONGODB_URI}`)

        const api = express()

        api.use(cors)

        api.get('/', (req, res) => {
            res.send('Hello, World!')
        })
        api.post('/users/investor', jsonBodyParser, registerInvestorHandler)

        api.post('/users/project', jsonBodyParser, registerProjectHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId/name', jwtVerifier, getUserNameHandler)

        api.get('/users/projects', jwtVerifier, getAllProjectsHandler)

        api.get('/users/investors', jwtVerifier, getAllInvestorsHandler)

        api.get('/users/likes', jwtVerifier, getLikeUsersHandler)

        api.get('/users/search', jwtVerifier, searchUserHandler)

        api.get('/users/match', jwtVerifier, getAllMatchsHandler)

        api.get('/users/:targetUserId', jwtVerifier, getUserHandler)

        api.get('/users/profile', jwtVerifier, getUserNameHandler)

        api.patch('/users/:targetUserId/likes', jwtVerifier, toggleLikeUserHandler)

        api.patch('/users/:targetUserId/dislikes', jwtVerifier, toggleDislikeUserHandler)

        api.patch('/users/:targetUserId/favs', jwtVerifier, toggleFavUserHandler)

        api.patch('/users/avatar', jwtVerifier, jsonBodyParser, updateAvatarHandler)

        api.patch('/users/image', jwtVerifier, jsonBodyParser, updateImageHandler)

        api.patch('/users/password', jwtVerifier, jsonBodyParser, updatePasswordHandler)

        api.patch('/users/:userId/description', jwtVerifier, jsonBodyParser, updateDescriptionHandler)

        api.delete('/users/:userId', jwtVerifier, deleteUserByIdHandler)

        api.post('/chat/:targetUserId', jwtVerifier, createChatHandler)

        api.post('/:chatId/message', jwtVerifier, jsonBodyParser, sendMessageHandler)

        api.get('/:targetUserId/messages', jwtVerifier, getChatMessagesHandler)

        api.get('/chats', jwtVerifier, getAllChatsHandler)

        api.get('/chats/:chatId', jwtVerifier, getChatParticipantHandler)

        api.get('/colors/search', (req, res, next) => {
            const colors = ['red', 'green', 'blue', 'violette', 'brown', 'yellow']

            const { q } = req.query

            const filtered = colors.filter(color => color.includes(q))

            res.json(filtered)
        })

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))