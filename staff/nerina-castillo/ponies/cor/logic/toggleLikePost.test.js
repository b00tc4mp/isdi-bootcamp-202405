import 'dotenv/config'
import toggleLikePost from "./toggleLikePost.js";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikePost('66acc0c8863c3606c60ba912', '66accc9f4ab9f9312c6f896c'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

