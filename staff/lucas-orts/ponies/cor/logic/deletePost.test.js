import 'dotenv/config'
import deletePost from './deletePost.js'

import mongoose from 'mongoose'
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        deletePost('Cacatua', '66a3907d93b0b4f3739d6ece', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post deleted')

            mongoose.disconnect()
        })

    })
    .catch(error => console.error(error))