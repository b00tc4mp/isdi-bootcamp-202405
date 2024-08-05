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

        api.get('/users/:targetUserId/name', jwtVerifier, handle.getUserName)

        api.get('/posts', jwtVerifier, handle.getAllPosts)

        api.get('/posts/followed', jwtVerifier, handle.getFollowedUserPosts)

        api.get('/posts/saved', jwtVerifier, handle.getUserSavedPosts)

        api.get('/users/:targetUserId/posts', jwtVerifier, handle.getUserPosts)

        api.get('/users/:targetUserId', jwtVerifier, handle.getUser)

        api.post('/posts', jsonBodyParser, jwtVerifier, handle.createPost)

        api.delete('/posts/:postId', jwtVerifier, handle.deletePost)

        api.patch('/posts/:postId/likes', jwtVerifier, handle.togglePostLike)

        api.patch('/posts/:postId/saved', jwtVerifier, handle.toggleSavedPost)

        api.patch('/posts/:targetUserId/follow', jwtVerifier, handle.toggleUserFollow)

        api.patch('/posts/:postId/caption', jwtVerifier, jsonBodyParser, handle.editPost)

        api.patch('/users/:targetUserId/username', jwtVerifier, jsonBodyParser, handle.editUserUsername)

        api.patch('/users/:targetUserId/avatar', jwtVerifier, jsonBodyParser, handle.editUserAvatar)

        api.get('/posts/search', jwtVerifier, handle.searchPosts)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))