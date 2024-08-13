import 'dotenv/config'
import express from 'express'

import { mongoose } from '../cor/index.js'

import { cors, jsonBodyParser, jwtVerifier, errorHandler } from './middlewares/index.js'

import {
    authenticateUserHandler,
    registerUserHandler,
    getUserNameHandler,
    getUserHandler,
    updateAvatarHandler,
    updatePasswordHandler,
    getAllHCPsHandler
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        const api = express()

        api.use(cors)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId/name', jwtVerifier, getUserNameHandler)

        api.get('/users/:targetUserId/settings', jwtVerifier, getUserHandler)

        api.get('/healthcareproviders', jwtVerifier, getAllHCPsHandler)

        api.patch('/users/avatar', jwtVerifier, jsonBodyParser, updateAvatarHandler)

        api.patch('/users/password', jwtVerifier, jsonBodyParser, updatePasswordHandler)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))