import 'dotenv/config'
import deletePost from './deletePost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        deletePost('marti', '66a0e350cd29d1ddfd3d2e5f', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post deleted')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))
