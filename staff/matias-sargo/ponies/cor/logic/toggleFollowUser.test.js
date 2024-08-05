import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        toggleFollowUser('musa', 'marti', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('user follow toggled')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))