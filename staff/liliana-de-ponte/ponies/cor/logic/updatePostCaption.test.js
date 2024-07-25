import 'dotenv/config'
import updatePostCaption from "./updatePostCaption.js";

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        updatePostCaption('lilideponte', '66a2159ae4df01c62b263e34', 'Funciona', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post caption updated')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))