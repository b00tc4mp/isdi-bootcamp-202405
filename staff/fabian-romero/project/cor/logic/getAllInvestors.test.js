import 'dotenv/config'
import getAllInvestors from './getAllInvestors.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllInvestors('66e7f467ee1d91f30c52cc3a'))
    .then(users => console.log(users))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())