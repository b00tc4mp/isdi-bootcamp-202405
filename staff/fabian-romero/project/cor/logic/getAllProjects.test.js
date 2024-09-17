import 'dotenv/config'
import getAllProjects from './getAllProjects.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllProjects('66e7f45ba2cc03b4f590073e'))
    .then(users => console.log(users))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())