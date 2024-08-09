import 'dotenv/config'
import getUserName from "./getUserName.js";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserName('66acc0c8863c3606c60ba912', '66acc0c8863c3606c60ba912'))
    .then(name => console.log(name))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())



