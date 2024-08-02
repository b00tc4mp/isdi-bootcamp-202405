import 'dotenv/config'
import deletePost from "./deletePost.js";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('juanfran', '66ab7d3ce95568316bf36ae7'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())


