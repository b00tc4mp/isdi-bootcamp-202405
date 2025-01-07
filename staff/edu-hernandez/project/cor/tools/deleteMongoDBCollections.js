import 'dotenv/config'
import { mongoose } from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`Connected to ${process.env.MONGODB_URI} MongoDB`)

        const db = mongoose.connection.db

        db.listCollections().toArray()
            .then(collections => {
                const promises = collections.map(collection => db.collection(collection.name).drop())

                return Promise.all(promises)
            })
            .then(() => {
                console.log('All collections deleted successfully')
            })
            .catch(error => console.error('Error deleting collections:', error))
            .then(() => { mongoose.connection.close() })
            .finally(() => {
                console.log(`Disconnected from ${process.env.MONGODB_URI} MongoDB`)
            })
    })
    .catch(error => { console.error('Error connecting to MongoDB:', error) })
