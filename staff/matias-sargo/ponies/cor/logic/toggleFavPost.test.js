import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleFavPost('musa', '66a22c1463a6739a553cf049', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('like post toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))