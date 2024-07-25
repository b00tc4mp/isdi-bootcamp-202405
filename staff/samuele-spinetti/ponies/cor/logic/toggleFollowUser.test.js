import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected')

        toggleFollowUser('samu', 'marco', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Follow user toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))

