import 'dotenv/config'
import mongoose from 'mongoose'
import updateImage from './updateImage.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateImage('66cc3c5901d704cbb4af4cc7', 'https://www.caricaturaspacoguzman.com/wp-content/uploads/2014/01/nens-face1.jpg'))
    .then(() => console.log('Image updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())