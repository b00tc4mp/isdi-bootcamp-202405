import 'dotenv/config'
import searchUser from './searchUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchUser('66c75324fcc8903b72c86139', 'atomic'))
    .then(() => console.log('User found'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())