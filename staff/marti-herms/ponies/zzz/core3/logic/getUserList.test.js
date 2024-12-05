import 'dotenv/config'
import getUserList from './getUserList.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        getUserList("eden", (error, userList) => {
            if (error) {
                console.error(error)

                return
            }

            console.log(userList)

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))