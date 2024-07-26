import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleFollowUser('lili', 'fabito', error => {
            if (error) {
                callbaback(new Error(error.message))

                return
            }
            console.log('follow user toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))