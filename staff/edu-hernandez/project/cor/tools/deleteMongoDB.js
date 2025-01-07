import 'dotenv/config'
import { mongoose } from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`Connected to ${process.env.MONGODB_URI} MongoDB`)

        mongoose.connection.db.dropDatabase()
            .then(() => {
                console.log('Database deleted successfully')
            })
            .catch(error => console.error('Error deleting database:', error))
            .then(() => { mongoose.connection.close() })
            .finally(() => {
                console.log(`Disconnected from ${process.env.MONGODB_URI} MongoDB`)
            })
    })
    .catch(error => { console.error('Error connecting to MongoDB:', error) })