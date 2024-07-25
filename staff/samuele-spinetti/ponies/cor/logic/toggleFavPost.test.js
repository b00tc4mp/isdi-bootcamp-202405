import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected')

        toggleFavPost('samu', '66a111fcfe6fce00dcc348c8', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Fav post toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))

