import 'dotenv/config'

import mongoose from 'mongoose'
import searchProducts from './searchProducts.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchProducts('', '', 400, [41.38250732128532, 2.1530769847253053]))
    .then(products => console.log(products))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())


