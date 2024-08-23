import 'dotenv/config'
import deleteProduct from './deleteProduct.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deleteProduct('66c74c8a360cfce07e79b9a2', '66c86eed102ddb0a2b60d8cc'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())