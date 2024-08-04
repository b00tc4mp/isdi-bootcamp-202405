import 'dotenv/config'
import updatePostCaption from "./updatePostCaption.js";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updatePostCaption('66acc0c8863c3606c60ba912', '66accc9f4ab9f9312c6f896c', 'yoooo'))
    .then(() => console.log('post caption updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
