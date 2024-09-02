import 'dotenv/config'
import getAllHCPs from './getAllHCPs.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getAllHCPs('66cda1786dad81a083c9afd5'))
    .then(healthCareProviders => console.log(healthCareProviders))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

