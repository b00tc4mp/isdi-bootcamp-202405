import 'dotenv/config'
import createPetsitter from './createPetsitter.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createPetsitter('66c44e188e4e3b820277485d', 'https://tse4.mm.bing.net/th?id=OIP.mY2aGHOW4vQuHgrugXJWPwHaE8&pid=Api&P=0&h=180', 'ElsAltres', 'Barcelona', 'me gustaria que esto funcionase correctamente', ['conejos', 'cobayas']))
    .then(() => console.log('petsitter created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())