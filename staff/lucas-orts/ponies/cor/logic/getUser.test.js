import 'dotenv/config'

import getUser from './getUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        getUser('Cacatua', 'Cacatua', (error, user) => {
            if (error) {
                console.error(error.message)

                return
            }

            console.log(user)

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))