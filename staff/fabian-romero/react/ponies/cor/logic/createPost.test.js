import 'dotenv/config'
import createPost from './createPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createPost('66acd7e6f28f138bd0f0752d', 'https://media.tenor.com/SNxgkBQqHbIAAAAM/okay-ok.gif', 'yeep!'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
