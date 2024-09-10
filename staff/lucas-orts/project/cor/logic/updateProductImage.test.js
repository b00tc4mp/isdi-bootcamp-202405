import 'dotenv/config'
import updateProductImage from './updateProductImage.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateProductImage('66e06099e4226e4fcf150aad', '66e06246c99dbf3e2ac22df2', 'https://media.giphy.com/media/l0IybQ6l8nfKjxQv6/giphy.gif'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())