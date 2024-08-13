import 'dotenv/config'
import mongoose from 'mongoose'

import { User, Post } from './models.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // const user = new User({
        //     name: 'Javi',
        //     surname: 'Yube',
        //     email: 'javi@yube.com',
        //     username: 'yube',
        //     password: '123123123'
        // })

        // User.save()
        //     .then(() => console.log('user saved'))
        //     .catch(error => console.error(error))

        // User.create({
        //     name: 'Marie',
        //     surname: 'Fernández',
        //     email: 'marie@fernandez.com',
        //     username: 'marie',
        //     password: '123123123'
        // })
        //     .then(() => console.log('user saved'))
        //     .catch(error => console.error(error))

        // User.findOne({ username: 'rtapia' })
        //     .then(user => {
        //         user.name = 'Ricardo'
        //         user.surname = 'Tapia'
        //         user.email = 'ricardo@tapia.com'
        //         user.username = 'ricardotapia'

        //         user.save()
        //             .then(() => console.log('user updated'))
        //             .catch(error => console.error(error))
        //     })
        //     .catch(error => console.error(error))

        // User.updateOne({ username: 'eduhv' }, { $set: { name: 'Eduard' } })
        //     .then(() => console.log('user updated'))
        //     .catch(error => console.error(error))

        // User.deleteOne({ username: 'Clark' })
        //     .then(() => console.log('user deleted'))
        //     .catch(error => console.error(error))

        User.find()
            .then(users => console.log(users))
            .catch(error => console.error(error))
    })
    .catch(error => console.error(error))