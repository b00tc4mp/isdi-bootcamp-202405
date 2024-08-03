import 'dotenv/config'
import mongoose from 'mongoose'

import { User, Post } from './models.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        const user = new User({ name: 'Ana', surname: 'Mendoza', email: 'ana@mendoza.com', username: 'anamendoza', password: '123456789' })

        user.save()
            .then(() => console.log('user saved'))
            .catch(error => console.error(error))

        // User.create({ name: 'Pepito', surname: 'Lopez', email: 'pepito@lopez.com', username: 'pepitolopez', password: '123456789' })
        //     .then(() => console.log('user saved'))
        //     .catch(error => console.error(error))

        // User.findOne({ username: 'pepitolopez' })
        //     .then(user => {
        //         user.name = 'Pepi'
        //         user.surname = 'Lopecito'
        //         user.email = 'pepi@lopecito.com'
        //         user.username = 'pepilopecito'

        //         user.save()
        //             .then(() => console.log('user updated'))
        //             .catch(error => console.error(error))
        //     })
        //     .catch(error => console.error(error))

        // User.updateOne({ username: 'pepilopecito' }, { $set: { name: 'Pepiz' } })
        //     .then(() => console.log('user updated'))
        //     .catch(error => console.error(error))

        // User.deleteOne({ username: 'pepilopecito' })
        //     .then(() => console.log('user deleted'))
        //     .catch(error => console.error(error))

        // User.find()
        //     .then(users => console.log(users))
        //     .catch(error => console.error(error))
    })
    .catch(error => console.error(error))