import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser('https://www.ngenespanol.com/wp-content/uploads/2024/03/estos-son-los-animales-que-no-deberias-tener-como-mascotas.jpg', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'user', 'elsAltres', 'Barcelona', 'estoy hasta las pelotas', 'conejo, cobaya'))
    .then(() => console.log('user registered'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())