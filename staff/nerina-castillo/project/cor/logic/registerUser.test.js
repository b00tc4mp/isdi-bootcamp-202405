import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser('broco', 'brocolee', 'label', 'broco@lee.com', 'brocolee123', 'brocolee123'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())