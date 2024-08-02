import 'dotenv/config'
import updatePostCaption from "./updatePostCaption.js";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePostCaption('juanfran', '66ab7e7385156518ecdcd558', 'yoooo'))
    .then(() => console.log('post caption updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
