import 'dotenv/config'
import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected')

        authenticateUser('samu', '123123123', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('User authenticated')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))