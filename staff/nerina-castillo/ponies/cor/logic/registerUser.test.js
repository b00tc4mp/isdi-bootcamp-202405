import 'dotenv/config'
import registerUser from "./registerUser.js";

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        registerUser('nery', 'cgomez', 'nery@cgomez.com', 'nerina', 'nerina123', 'nerina123', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('user registered')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))
