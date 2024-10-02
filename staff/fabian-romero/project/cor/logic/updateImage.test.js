import 'dotenv/config'
import mongoose from 'mongoose'
import updateImage from './updateImage.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateImage('66d18c1ebbaabbb0a62f5123', 'https://NuevaImagen.jpg'))
    .then(() => console.log('Image updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())