import 'dotenv/config'
import getUser from './getUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        getUser('eden', 'eden', (error, user) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(user)

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))