import {MongoClient} from 'mongodb'

const client= new MongoClient('mongodb://127.0.0.1:27017') 

client.connect()
    .then(() => {
        console.log('connected')

        const test = client.db('test')
        const users = test.collection('users')

        // users.insertOne({ name: 'Samuele', surname: 'Spinetti', email: 'samuele@spinetti.com', username: 'samuelespinetti', password: '12312323' })
        //     .then(() => console.log('samuele inserted'))
        //     .catch(error => console.error(error))

        // users.find({}).toArray()
        //     .then(users => console.log(users))
        //     .catch(error => console.error(error))

        // TODO learn how to CRUD (.findOne, .updateOne, .deleteOne...)
    })
    .catch(error => console.error(error))