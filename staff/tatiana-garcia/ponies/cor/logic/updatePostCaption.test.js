import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        updatePostCaption('fabito', '66a1ed4d15e1b19d77264647', 'weeeee', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post caption update')

            mongoose.disconnect()
        })

    })
    .catch(error => console.error(error))
