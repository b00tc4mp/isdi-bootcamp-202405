import 'dotenv/config'
import express from 'express'

import { mongoose } from '../cor/index.js'

import { cors, jsonBodyParser, jwtVerifier, errorHandler } from './middlewares/index.js'

import {
    registerUserHandler,
    authenticateUserHandler,
    getUserHandler,
    updateUserHandler,
    registerPetsitterUserHandler,
    getAllPetsittersHandler,
    searchPetsittersHandler,
    getPetsitterDetailsHandler,
    addReviewHandler,
    getPetsitterReviewHandler,
    deletePetsitterReview

} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info(`API connected to ${process.env.MONGODB_URI}`)

        const api = express()

        api.use(cors)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/petsitterUser', jsonBodyParser, registerPetsitterUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId', jwtVerifier, getUserHandler)

        api.get('/petsitters', getAllPetsittersHandler)

        api.get('/petsitters/search', searchPetsittersHandler)

        api.get('/petsitters/:petsitterId', getPetsitterDetailsHandler)

        api.get('/petsitters/:petsitterId/reviews', getPetsitterReviewHandler)

        api.post('/petsitters/:petsitterId/review', jsonBodyParser, addReviewHandler)

        api.patch('/users/:userId', jwtVerifier, jsonBodyParser, updateUserHandler)

        api.delete('/review/:reviewId', jwtVerifier, deletePetsitterReview)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))