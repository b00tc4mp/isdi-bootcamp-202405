import 'dotenv/config'
import searchUser from './searchUser.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchUser('66d1ada61c09da2bbca65426', 'trueno'))
    .then(user => console.log(user))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())