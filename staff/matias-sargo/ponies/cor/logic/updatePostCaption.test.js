import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        updatePostCaption('samu', '66a22c2d256603d7c5014e9c', 'manu, mi super heroe!', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post caption updated')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))