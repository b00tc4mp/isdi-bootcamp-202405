import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected')

        registerUser('Marco', 'Carbone', 'marco@carbone.com', 'marco', '123123123', '123123123', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('User registered')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))