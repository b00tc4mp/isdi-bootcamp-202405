import 'dotenv/config'
import deletePost from './deletePost.js'

import mongoose from 'mongoose'
mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('66ae141634b7a3d8e048afe0', '66ae1594c3cf2cfb73df9f34'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())