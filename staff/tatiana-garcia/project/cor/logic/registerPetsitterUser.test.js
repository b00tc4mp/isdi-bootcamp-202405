import 'dotenv/config'
import registerPetsitterUser from './registerPetsitterUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerPetsitterUser('https://hospitalveterinariodonostia.com/wp-content/uploads/2018/12/6-lugares-donde-puedes-ver-animales-exoticos-6.jpg', 'ElsAltres', 'Barcelona', 'La mejor guarderia del mundo', 'els@altres.com', '600131320', '123123123', '123123123', ['aves', 'reptiles']))
    .then(() => console.log('petsitter registered'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())