import 'dotenv/config'
import createPost from './createPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createPost('tatig', 'https://www.grupoxcaret.com/es/wp-content/uploads/2021/03/aves-boris.jpg', 'pajaro azul'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())