import 'dotenv/config'

import toggleFavPost from "./toggleFavPost.js";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleFavPost('66acc0c8863c3606c60ba912', '66accc9f4ab9f9312c6f896c'))
    .then(() => console.log('fav post toggled'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
