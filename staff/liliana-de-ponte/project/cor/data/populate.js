import 'dotenv/config'
import mongoose from 'mongoose'
import { }

mongoose.connect(process.env.MONGODB_URI)
        .then(() => Event.deleteMany())
        .then(() => Event.create([
            {
                title,
                organizer,
                date: new Date(date),
                duration,
                description,
                image,
                location,
                address,
                city,


            }]))
        .then(() => mongoose.disconnect())
        .then(() => console.log('populated'))
        .catch(error => console.error(error))