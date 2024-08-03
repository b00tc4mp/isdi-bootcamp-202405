import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('66acf0f09c0d3d4816596cc5', '66acf20810108ed9d0e093db'))
    .then(() => console.log('post deleted'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())