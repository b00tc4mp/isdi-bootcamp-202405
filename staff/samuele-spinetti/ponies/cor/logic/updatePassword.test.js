import 'dotenv/config'
import updatePassword from './updatePassword.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected')

        updatePassword('marco', '123123123', '123456789', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Password updated')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))