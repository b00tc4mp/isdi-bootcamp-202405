import 'dotenv/config'
import updateProductImage from './updateProductImage.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateProductImage('66c74c8a360cfce07e79b9a2', '66c87387eaefe470e8ae6498', 'https://media.giphy.com/media/l0IybQ6l8nfKjxQv6/giphy.gif'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())