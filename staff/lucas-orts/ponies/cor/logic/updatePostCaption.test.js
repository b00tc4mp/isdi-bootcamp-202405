import 'dotenv/config'
import updatePostCaption from './updatePostCaption.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePostCaption('66ae141634b7a3d8e048afe0', '66af519f7883c41e81095f11', 'ponita marica'))
    .then(() => console.log('post caption updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())