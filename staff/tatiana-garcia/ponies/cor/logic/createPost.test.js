import 'dotenv/config'
import createPost from './createPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        createPost('lili', 'https://www.grupoxcaret.com/es/wp-content/uploads/2021/03/aves-boris.jpg', 'pajaro azul', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post created')

            mongoose.disconnect()
        })

    })
    .catch(error => console.error(error))
