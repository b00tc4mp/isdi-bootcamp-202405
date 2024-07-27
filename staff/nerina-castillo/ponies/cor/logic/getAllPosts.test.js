import 'dotenv/config'

import getAllPosts from './getAllPosts.js'

import mongoose, { mongo } from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        getAllPosts('julitoCamelas', (error, posts) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(posts)

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))

