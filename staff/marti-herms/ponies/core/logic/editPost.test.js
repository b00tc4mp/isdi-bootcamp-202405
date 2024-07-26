import 'dotenv/config'
import editPost from './editPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        editPost('eden', '66a0f6b48739a63eddc00299', 'My Nicholas <3', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post edited')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))