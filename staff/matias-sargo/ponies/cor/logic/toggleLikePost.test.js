import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleLikePost('musa', '66a22c2d256603d7c5014e9c', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('like post toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))