import 'dotenv/config'
import getCartProduct from './getCartProduct.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getCartProduct('66faa02cd5d3203dc60bbcbc'))
    .then(product => console.log(product))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())