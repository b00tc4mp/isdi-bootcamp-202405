import 'dotenv/config'
import registerUser from "./registerUser.js"
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerUser("Lili", "De Ponte", "lili@deponte.com", "lilideponte", "123456789", "123456789"))
    // .then(() => registerUser("Samu", "Spine", "samu@spine.com", "samuspine", "123456789", "123456789"))
    .then(() => console.log('user registered'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
