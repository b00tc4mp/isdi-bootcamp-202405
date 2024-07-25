import 'dotenv/config'
import authenticateUser from './authenticateUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        authenticateUser('samu', '123123123', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('user authenticated')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))
