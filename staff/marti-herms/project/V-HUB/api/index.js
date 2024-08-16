import 'dotenv/config'
import express from 'express'
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

        api.get('/users/:targetUserId/username', jwtVerifier, handle.getUserUsername)

        api.post('/games', jwtVerifier, jsonBodyParser, handle.registerGame)

        api.get('/games/search', jwtVerifier, handle.searchGame)

        api.get('/games/library', jwtVerifier, handle.getUserLibrary)

        api.get('/games/favs', jwtVerifier, handle.getUserFavs)

        api.patch('/games/:gameId/library', jwtVerifier, handle.toggleAddGame)

        api.patch('/games/:gameId/favs', jwtVerifier, handle.toggleFavGame)

        api.post('/games/:gameId/review', jwtVerifier, jsonBodyParser, handle.makeReview)

        api.get('/games/dev', jwtVerifier, handle.getDevUserGames)

        api.get('/games/:gameId', jwtVerifier, handle.getGameById)

        api.get('/games/:gameId/reviews', jwtVerifier, handle.getGamesReviews)

        api.delete('/reviews/:reviewId', jwtVerifier, handle.deleteReview)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))