import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('66c45334dac6d9258ea0f899', '66c45359dac6d9258ea0f89d'))
    .then(() => console.log('post deleted'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())