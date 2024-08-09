import 'dotenv/config'
import express from 'express'

import { mongoose } from '../cor/index.js'

import { cors, jsonBodyParser, errorHandler } from './middlewares/index.js'
import {
    registerUserHandler
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info(`Api connected to ${process.env.MONGODB_URI}`)

        const api = express()

        api.use(cors)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.log(`API listening on PORT ${process.env.PORT}`))


    })
    .catch(error => console.error(error))