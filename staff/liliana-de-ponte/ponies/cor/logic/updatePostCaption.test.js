import 'dotenv/config'
import updatePostCaption from "./updatePostCaption.js";

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePostCaption('66acd71db43870a515ffb02f', '66acd787cb749efdab22f8f2', 'Funciona'))
    .then(() => console.log('post caption updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
