import 'dotenv/config'
import getUserName from './getUserName.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserName('66b85d25fae0a8aedbb51864', '66b85d25fae0a8aedbb51864'))
    .then(name => console.log(name))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
