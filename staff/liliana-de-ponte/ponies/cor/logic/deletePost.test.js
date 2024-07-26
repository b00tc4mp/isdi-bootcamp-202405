import 'dotenv/config'
import deletePost from './deletePost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        deletePost('samuelespinetti', '66a12a0562aa6b753ba394f8', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post deleted')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))