import 'dotenv/config'
import editUserUsername from './editUserUsername.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        editUserUsername('Eden', 'eden', '11111111', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post created')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))