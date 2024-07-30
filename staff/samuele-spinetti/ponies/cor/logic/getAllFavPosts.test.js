import 'dotenv/config'
import getAllFavPosts from './getAllFavPosts.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected')

        getAllFavPosts('samu', (error, posts) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(posts)

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))