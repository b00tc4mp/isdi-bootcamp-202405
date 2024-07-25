import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleFavPost('lilideponte', '66a2159ae4df01c62b263e34', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('fav post toggled')

            mongoose.disconnect()

        })
    })
    .catch(error => console.error(error))
