import 'dotenv/config'
import getUserName from "./getUserName.js";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => getUserName('juanfran', 'juanfran'))
    .then(name => console.log(name))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())



