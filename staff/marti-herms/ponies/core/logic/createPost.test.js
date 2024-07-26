import 'dotenv/config'
import createPost from './createPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        createPost('eden', 'https://sm.ign.com/t/ign_es/feature/t/the-15-bes/the-15-best-nicolas-cage-movies_ugq2.1280.jpg', 'hello world', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post created')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))