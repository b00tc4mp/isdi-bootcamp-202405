import 'dotenv/config'
import registerUser from "./registerUser.js";

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser('juan', 'fran', 'juan@fran.com', 'juanfran', 'juanfran123', 'juanfran123'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())



