import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected')

        deletePost('samu', '66a111da21d28f7435d5c1d6', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Post deleted')

            mongoose.connection()
        })
    })
    .catch(error => console.error(error))