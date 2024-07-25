import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleLikePost('lilideponte', '66a2159ae4df01c62b263e34', error => {
            if (error) {
                console.error(error)

                return
            }
            console.log('like post toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))