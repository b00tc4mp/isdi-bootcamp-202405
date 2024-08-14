import 'dotenv/config'
import updateEventData from './updateEventData.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        const userId = '66bce29709e08ebd9fad9884'
        const eventId = '66bce2e37e27eef46514aef0'
        const updatedEventData = {
            description: 'bad nerves',
            location: { type: 'Point', coordinates: [40.7123, -74.1060] },
            startDate: new Date(),
            endDate: new Date()
        }

        return updateEventData(userId, eventId, updatedEventData)
    }).then(() => console.log('event updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())