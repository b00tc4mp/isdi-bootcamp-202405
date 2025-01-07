import mongoose from 'mongoose'
import 'dotenv/config'
import { User, Event, Location } from './models.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')

        return User.deleteMany()
    })
    .then(() => {
        console.log('all users deleted')

        const user = new User({
            name: 'Charlio',
            surname: 'Brown',
            email: 'charlio@brown.com',
            username: 'charliebrown',
            password: '123123123'
        })
        return user.save()
    })

    .then(user => {
        console.log('user created')
        console.log(user)
        console.log('user saved')

        return User.create({
            name: 'Mari',
            surname: 'Juana',
            email: 'mari@juana.com',
            username: 'marijuana',
            password: '123123123'
        })
    })
    .then(user => {
        console.log(user)
        console.log('user created')

        return User.findOne({ username: 'marijuana' })
    })
    .then(user => {
        if (user) {
            user.name = 'Mary'
            user.surname = 'Jane'
            user.email = 'mary@jane.com'
            user.username = 'maryjane'

            return user.save()
        }
    })
    .then(user => {
        console.log(user, 'user updated')

        return User.findOneAndUpdate(
            { username: 'charliebrown' },
            { $set: { name: 'Charlie', email: 'charlie@brown.com' } },
            { new: true }
        )
    })
    .then(userUpdated => {
        console.log(userUpdated)
        console.log('user updated')

        return User.deleteMany()
    })
    .then(() => {
        console.log('all users deleted')

        return User.find()
    })
    .then(users => {
        console.log(users)
    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => {
        mongoose.disconnect()
            .then(() => console.log('Disconnected from MongoDB'))
            .catch(error => console.error('error disconnecting from MongoDB:', error))
    })