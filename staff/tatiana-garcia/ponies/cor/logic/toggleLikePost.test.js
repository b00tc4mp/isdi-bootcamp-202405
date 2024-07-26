import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose, { mongo } from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleLikePost('samuelespinetti', '66a2639ccaa8b9f476fb2d97', error => {
            if (error) {
                console.error(error)

                return
            }
            console.log('like post toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))