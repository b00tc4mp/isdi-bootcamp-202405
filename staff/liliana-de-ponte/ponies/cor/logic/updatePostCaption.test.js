import 'dotenv/config'
import updatePostCaption from "./updatePostCaption.js";

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePostCaption('lilideponte', '66a2159ae4df01c62b263e34', 'Funciona'))
    .then(() => console.log('post caption updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
