import 'dotenv/config'
import express from 'express'

import { mongoose } from 'core'

import { cors, jsonBodyParser, jwtVerifier, errorHandler } from './middlewares/index.js'

import handle from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`API connected to ${process.env.MONGODB_URI}`)

        const api = express()

        api.use(cors)

        api.post('/users', jsonBodyParser, handle.registerUser)

        api.post('/users/auth', jsonBodyParser, handle.authenticateUser)

        api.get('/users/:targetUsername/name', jwtVerifier, handle.getUserName)

        api.get('/posts', jwtVerifier, handle.getAllPosts)

        api.get('/posts/followed', jwtVerifier, handle.getFollowedUserPosts)

        api.get('/posts/saved', jwtVerifier, handle.getUserSavedPosts)

        api.get('/users/:targetUsername/posts', jwtVerifier, handle.getUserPosts)

        api.get('/users/list', jwtVerifier, handle.getUserList)

        api.get('/users/:targetUsername', jwtVerifier, handle.getUser)

        api.post('/posts', jsonBodyParser, jwtVerifier, handle.createPost)

        api.delete('/posts/:postId', jwtVerifier, handle.deletePost)

        api.patch('/posts/:postId/likes', jwtVerifier, handle.togglePostLike)

        api.patch('/posts/:postId/saved', jwtVerifier, handle.toggleSavedPost)

        api.patch('/posts/:targetUsername/follow', jwtVerifier, handle.toggleUserFollow)

        api.patch('/posts/:postId/caption', jwtVerifier, jsonBodyParser, handle.editPost)

        api.patch('/users/:targetUsername/username', jwtVerifier, jsonBodyParser, handle.editUserUsername)

        api.patch('/users/:targetUsername/avatar', jwtVerifier, jsonBodyParser, handle.editUserAvatar)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))