import 'dotenv/config'
import getUserName from './getUserName.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')
        getUserName("eden", 'val', (error, name) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(name)

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))