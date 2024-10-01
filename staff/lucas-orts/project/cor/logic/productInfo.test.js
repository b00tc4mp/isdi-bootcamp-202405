import 'dotenv/config'
import mongoose from 'mongoose'
import productInfo from './productInfo.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => productInfo('66fc2c203494e3ad705def9a'))
    .then(product => console.log(product))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())