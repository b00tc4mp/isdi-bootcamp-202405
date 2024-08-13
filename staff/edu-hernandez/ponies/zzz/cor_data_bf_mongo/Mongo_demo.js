import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(() => {
        console.log('connected')

        const test = client.db('test')
        const users = test.collection('users')

        users.find({}).toArray()
            .then(users => console.log(users))
            .catch(error => console.error(error))

        console.log()

        users.insertMany(
            [
                {
                    name: 'Eduard',
                    surname: 'Hernández',
                    email: 'edu@hdz.com',
                    username: 'eduhv',
                    password: '123123123'

                },
                {
                    name: 'Lucas',
                    surname: 'Orts',
                    email: 'lucas@orts.com',
                    username: 'lucas',
                    password: '123123123'
                },
                {
                    name: 'Fabian',
                    surname: 'Romero',
                    email: 'fabian@romero.com',
                    username: 'fabian',
                    password: '123123123'
                },
                {
                    name: 'Marti',
                    surname: 'Erms',
                    email: 'marti@erms.com',
                    username: 'marti',
                    password: '123123123'
                },
                {
                    name: 'Samuele',
                    surname: 'Spinetti',
                    email: 'samuele@spinetti.com',
                    username: 'samuele',
                    password: '123123123'
                },
                {
                    name: 'Tatiana',
                    surname: 'Lopez',
                    email: 'tati@lopez.com',
                    username: 'tati',
                    password: '123123123'
                }
            ])
            .then(() => console.log())

        users.find({}).toArray()
            .then(users => console.log(users))
            .catch(error => console.error(error))

        users.insertOne(
            {
                name: 'Frank',
                surname: 'Pereyra',
                email: 'frank@pereyra.com',
                username: 'frank'
            })
            .then(() => { users => console.log(users)})

    })
    .catch(error => console.error(error))