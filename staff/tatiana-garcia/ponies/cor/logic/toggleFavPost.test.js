import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleFavPost('lili', '66a2639ccaa8b9f476fb2d97', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post favorite')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))