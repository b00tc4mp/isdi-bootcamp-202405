import 'dotenv/config'
import getUserSavedPosts from './getUserSavedPosts.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        getUserSavedPosts('samu', (error, posts) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(posts)

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))