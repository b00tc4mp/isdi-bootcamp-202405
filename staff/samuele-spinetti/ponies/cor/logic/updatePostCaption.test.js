import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected')

        updatePostCaption('samu', '66a1fce9899f38e1749e83e5', 'Hello, Marco:)', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Post caption updated')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))
