import 'dotenv/config'
import deletePost from './deletePost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        deletePost('eden', '66a2d62802b6a4f1d056bdf3', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post deleted')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))