import 'dotenv/config'
import mongoose from 'mongoose'
import searchHCP from './searchHCP.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchHCP('66bf0fee311a7ff978ef971e', 'hospital', 1, [41.4896223, 2.2375339]))
    .then(healthCareProviders => console.log(healthCareProviders))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

