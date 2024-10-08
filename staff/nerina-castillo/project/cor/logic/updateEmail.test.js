import 'dotenv/config'
import updateEmail from './updateEmail.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateEmail('66feca5b257d2a449f69dafe', 'julio@camel.com'))
    .then(() => console.log('email updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())