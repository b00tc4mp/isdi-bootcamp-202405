import 'dotenv/config'
import editUserAvatar from './editUserAvatar.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        editUserAvatar('eden', 'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('avatar edited')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))