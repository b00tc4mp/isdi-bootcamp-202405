import 'dotenv/config'
import mongoose from 'mongoose'
import searchHCP from './searchHCP.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => searchHCP('66bb510ca7f887b177c81604', 'Stop'))
    .then(healthCareProviders => console.log(healthCareProviders))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

