import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected')

        toggleLikePost('samu', '66a111fcfe6fce00dcc348c8', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Like post toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))
