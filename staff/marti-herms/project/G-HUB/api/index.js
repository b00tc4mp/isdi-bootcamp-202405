import 'dotenv/config'
import express, { json } from 'express'
import cors from 'cors'

import { mongoose } from 'core'

import { jsonBodyParser, jwtVerifier, errorHandler } from './middleware/index.js'

import handle from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info(`API connected to ${process.env.MONGODB_URI}`)

        const api = express()

        api.use(cors())

        api.post('/users', jsonBodyParser, handle.registerUser)

        api.post('/users/auth', jsonBodyParser, handle.authenticateUser)

        api.patch('/users/username', jwtVerifier, jsonBodyParser, handle.editUserUsername)

        api.patch('/users/avatar', jwtVerifier, jsonBodyParser, handle.editUserAvatar)

        api.get('/users/search', jwtVerifier, handle.searchUser)

        api.get('/users/:targetUserId', jwtVerifier, handle.getUser)

        api.get('/users/:targetUserId/username', jwtVerifier, handle.getUserUsername)

        api.get('/users/:targetUserId/avatar', jwtVerifier, handle.getUserAvatar)

        api.get('/users/:targetUserId/following', jwtVerifier, handle.getUserFollowing)

        api.get('/users/:targetUserId/followers', jwtVerifier, handle.getUserFollowers)

        api.patch('/users/:targetUserId/follow', jwtVerifier, handle.toggleFollowUser)

        api.post('/games', jwtVerifier, jsonBodyParser, handle.registerGame)

        api.get('/games/search', jwtVerifier, handle.searchGame)

        api.get('/games/:targetUserId/library', jwtVerifier, handle.getUserLibrary)

        api.get('/games/:targetUserId/favs', jwtVerifier, handle.getUserFavs)

        api.get('/games/:targetUserId/dev', jwtVerifier, handle.getDevUserGames)

        api.get('/games/:gameId', jwtVerifier, handle.getGameById)

        api.get('/games/:gameId/reviews', jwtVerifier, handle.getGamesReviews)

        api.patch('/games/:gameId/library', jwtVerifier, handle.toggleAddGame)

        api.patch('/games/:gameId/favs', jwtVerifier, handle.toggleFavGame)

        api.post('/games/:gameId/review', jwtVerifier, jsonBodyParser, handle.makeReview)

        api.delete('/reviews/:reviewId', jwtVerifier, handle.deleteReview)

        api.get('/chat/:targeUserId', jwtVerifier, handle.openChat)

        api.post('/chat/:chatId/messages', jwtVerifier, jsonBodyParser, handle.sendMessage)

        api.get('/chat/:chatId/messages', jwtVerifier, handle.getChatMessages)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))