import 'dotenv/config'
import deletePost from "./deletePost.js";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        deletePost('julitoCamelas', '66a259d1ba0dee70df0fbe7b', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post deleted')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))