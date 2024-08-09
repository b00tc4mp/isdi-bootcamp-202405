import 'dotenv/config'
import deletePost from './deletePost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('66acd7e6f28f138bd0f0752d', '66ace065cf0f421ac2613bc1'))
    .then(() => console.log('post deleted'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
