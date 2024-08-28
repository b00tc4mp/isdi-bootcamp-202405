import 'dotenv/config'
import getAllInvestors from './getAllInvestors.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllInvestors('66cc3c5901d704cbb4af4cc7'))
    .then(users => console.log(users))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())