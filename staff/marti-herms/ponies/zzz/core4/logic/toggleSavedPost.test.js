import 'dotenv/config'
import toggleSavedPost from './toggleSavedPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleSavedPost('eden', '66a0f6b48739a63eddc00299', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('save toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))