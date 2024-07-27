import 'dotenv/config'
import updatePostCaption from "./updatePostCaption.js";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        updatePostCaption('nerina', '66a271a2432c84e84c9312bb', 'yo', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('caption updated')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))
