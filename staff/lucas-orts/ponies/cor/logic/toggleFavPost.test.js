import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'


import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleFavPost('Cacatua', '66a21404e66ac7c76a9f9bbb', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('fav post toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))