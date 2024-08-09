import 'dotenv/config'
import getUserName from './getUserName.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserName('66acb2b1730b0f09da259589', '66acb2db1f5dbdd3ba4e3efc'))
    .then(name => console.log(name))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())