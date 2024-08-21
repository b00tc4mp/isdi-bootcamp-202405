import 'dotenv/config'
import getAllComments from './getAllComments.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllComments('66c488dffd5d85f0ccc8ecdc', '66c48926e2571d7e27f9cad2'))
    .then(comments => console.log(comments))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())