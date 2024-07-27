import 'dotenv/config'
import toggleLikePost from "./toggleLikePost.js";
import mongoose, { mongo } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleLikePost('julitoCamelas', '66a259d1ba0dee70df0fbe7b', (error) => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post liked')

            mongoose.disconnect()

        })
    })
    .catch(error => console.error(error))