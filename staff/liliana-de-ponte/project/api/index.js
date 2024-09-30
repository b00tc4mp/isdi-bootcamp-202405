import 'dotenv/config'
import express from 'express'

import { mongoose } from '../cor/index.js'

import { cors, jsonBodyParser, jwtVerifier, errorHandler } from './middlewares/index.js'
import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    createEventHandler,
    getAllEventsHandler,
    deleteEventHandler,
    toggleLikeEventHandler,
    getAllLikeEventsHandler,
    toggleAttendanceEventHandler,
    getAllAttendanceEventsHandler,
    searchEventsHandler,
    getEventHandler,
    updateEventHandler
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info(`Api connected to ${process.env.MONGODB_URI}`)

        const api = express()

        api.use(cors)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId/name', jwtVerifier, getUserNameHandler)

        api.post('/events', jwtVerifier, jsonBodyParser, createEventHandler)

        api.get('/events', jwtVerifier, getAllEventsHandler)

        api.delete('/events/:eventId', jwtVerifier, deleteEventHandler)

        api.patch('/events/:eventId', jwtVerifier, jsonBodyParser, updateEventHandler)

        api.patch('/events/:eventId/likes', jwtVerifier, toggleLikeEventHandler)

        api.get('/events/likes', jwtVerifier, getAllLikeEventsHandler)

        api.patch('/events/:eventId/attendees', jwtVerifier, toggleAttendanceEventHandler)

        api.get('/events/attendees', jwtVerifier, getAllAttendanceEventsHandler)

        api.get('/events/search', jwtVerifier, searchEventsHandler)

        api.get('/events/:eventId/info', jwtVerifier, getEventHandler)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.log(`API listening on PORT ${process.env.PORT}`))

    })
    .catch(error => console.error(error))