import 'dotenv/config'
import deletePost from "./deletePost.js";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('66acc0c8863c3606c60ba912', '66acc10f4fb1313476939a23'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())


