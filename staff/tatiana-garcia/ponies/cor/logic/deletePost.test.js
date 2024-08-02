import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('lili', '66a265316477222854bc4cb9'))
    .then(() => console.log('post deleted'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())