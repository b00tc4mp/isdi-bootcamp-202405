import 'dotenv/config'
import deletePost from './deletePost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        deletePost("Fabito", '66a25a5ee73ac5cd55859aa0', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post deleted')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))