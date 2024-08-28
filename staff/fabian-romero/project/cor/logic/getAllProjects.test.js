import 'dotenv/config'
import getAllProjects from './getAllProjects.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllProjects('66cc3c5901d704cbb4af4cc7'))
    .then(users => console.log(users))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())