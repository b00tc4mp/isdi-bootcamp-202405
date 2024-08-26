import 'dotenv/config'
import getAllUserProducts from './getAllUserProducts.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllUserProducts('66cb76f3220cbfc7ec120782'))
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())