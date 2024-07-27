import 'dotenv/config'

import toggleFavPost from "./toggleFavPost.js";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleFavPost('julitoCamelas', '66a23a50979ab6c44799b268', (error) => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post saved')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))
