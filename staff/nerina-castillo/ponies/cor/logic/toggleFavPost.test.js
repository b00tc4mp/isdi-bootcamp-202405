import 'dotenv/config'

import toggleFavPost from "./toggleFavPost.js";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavPost('juanfran', '66ab7e7385156518ecdcd558'))
    .then(() => console.log('fav post toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
