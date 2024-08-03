import 'dotenv/config'
import createPost from './createPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createPost('66acf0f09c0d3d4816596cc5', 'https://www.grupoxcaret.com/es/wp-content/uploads/2021/03/aves-boris.jpg', 'pajaro'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())