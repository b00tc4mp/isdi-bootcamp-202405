import 'dotenv/config'
import getUser from './getUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected')

        getUser('samu', 'samu', (error, user) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(user)

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))

