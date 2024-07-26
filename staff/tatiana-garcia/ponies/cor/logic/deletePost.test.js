import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        deletePost('lili', '66a265316477222854bc4cb9', error => {
            if (error) {
                console.error(error)

                return
            }
            console.log('post deleted')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))





