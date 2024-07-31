import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleLikePost('Petazeta', '66a2145ceaa27d4bacad182a', error => {
            if (error) {
                console.error(error)

                return
            }
            console.log('like post toggled')
            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))