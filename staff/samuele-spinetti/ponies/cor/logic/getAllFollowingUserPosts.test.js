import 'dotenv/config'
import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected')

        getAllFollowingUserPosts('samu', (error, posts) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(posts)

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))