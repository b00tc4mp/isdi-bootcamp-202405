import 'dotenv/config'
import toggleLikePost from "./toggleLikePost.js";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => toggleLikePost('awambaBoluba', '66aa384d0bc715df5a3004a6'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

