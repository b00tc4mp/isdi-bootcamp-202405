import 'dotenv/config'
import createPost from './createPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        createPost('Fabito', 'https://media.tenor.com/SNxgkBQqHbIAAAAM/okay-ok.gif', 'yeep!', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post created')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))