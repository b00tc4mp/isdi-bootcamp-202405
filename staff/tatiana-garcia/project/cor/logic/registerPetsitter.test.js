import 'dotenv/config'
import registerPetsitter from './registerPetsitter.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerPetsitter('https://www.ngenespanol.com/wp-content/uploads/2024/03/estos-son-los-animales-que-no-deberias-tener-como-mascotas.jpg', 'Tatiana', 'Garcia', 'tatig', 'B12345678', 'Barcelona', 'tat@garcia.com', '123123123', '123123123'))
    .then(() => console.log('petsitter registered'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())