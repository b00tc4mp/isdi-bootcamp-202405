import 'dotenv/config'
import mongoose from 'mongoose'

import { User, Post } from './models.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // const user = new User({ name: 'Muele', surname: 'Netti', email: 'muele@netti.com', username: 'muelenetti', password: '123123123' })

        // user.save()
        //     .then(() => console.log('user saved'))
        //     .catch(error => console.error(error))

        User.create({ name: 'Suma', surname: 'Speni', email: 'suma@speni.com', username: 'sumaspeni', password: '123123123' })
            .then(() => console.log('user saved'))
            .catch(error => console.error(error))

        // User.findOne({ username: 'sumaspeni' })
        //     .then(user => {
        //         user.name = 'Samu'
        //         user.surname = 'Spine'
        //         user.email = 'samu@spine.com'
        //         user.username = 'samuspine'

        //         user.save()
        //             .then(() => console.log('user updated'))
        //             .catch(error => console.error(error))
        //     })
        //     .catch(error => console.error(error))

        // User.updateOne({ username: 'samu' }, { $set: { name: 'Samuelet' } })
        //     .then(() => console.log('user updated'))
        //     .catch(error => console.error(error))

        // User.deleteOne({ username: 'samuspine' })
        //     .then(() => console.log('user deleted'))
        //     .catch(error => console.error(error))

        // User.find()
        //     .then(users => console.log(users))
        //     .catch(error => console.error(error))
    })
    .catch(error => console.error(error))