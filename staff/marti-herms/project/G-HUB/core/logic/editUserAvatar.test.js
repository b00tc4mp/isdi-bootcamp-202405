import 'dotenv/config'
import mongoose from 'mongoose'

import editUserAvatar from './editUserAvatar.js'

const newAvatar = 'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => editUserAvatar('66acb2b1730b0f09da259589', newAvatar))
    .then(games => console.log(games))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())