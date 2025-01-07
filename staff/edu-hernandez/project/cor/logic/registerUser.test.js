import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'
import { User } from '../data/models.js'

mongoose.connect(process.env.MONGODB_URI)

        .then(() => registerUser(
                'Bruno',
                'Diaz',
                'user',
                'bruno@diaz.com',
                'brunodiaz',
                '123123123',
                '123123123'
        ))
        .then((user) => console.log('user registered', user))
        .catch(error => console.error(error))
        
        .then(() => registerUser(
                'Peter',
                'Parker',
                'user',
                'peter@parker.com',
                'peterparker',
                '123123123',
                '123123123'
        ))
        .then((user) => console.log('user registered', user))
        .catch(error => console.error(error))
        
        .then((user) => registerUser(
                'Charlie',
                'Brown',
                'user',
                'charlie@brown.com',
                'charlie',
                '123123123',
                '123123123'
        ))
        .then((user) => console.log('user registered', user))
        .catch(error => console.error(error))
        
        .then((user) => registerUser(
                'Bruce',
                'Wayne',
                'user',
                'bruce@wayne.com',
                'brucewayne',
                '123123123',
                '123123123'
        ))
        .then((user) => console.log('user registered', user))
        .catch(error => console.error(error))
        
        
        .then((user) => registerUser(
                'Ricardo',
                'Tapia',
                'user',
                'ricardo@tapia.com',
                'ricardotapia',
                '123123123',
                '123123123'
        ))
        .then((user) => console.log('user registered', user))
        .catch(error => console.error(error))
        
        .then((user) => User.create({
                name: 'Mary',
                surname: 'Jane',
                role: 'user',
                email: 'mary@jane.com',
                username: 'lamary',
                password: '123123123',
                repeatPassword: '123123123'
        }))
        .then((user) => console.log('user registered', user))
        .catch(error => console.error(error))
        
        // .then(() => User.deleteMany())
        // .then(() => console.log('users deleted'))
        .finally(() => mongoose.disconnect())