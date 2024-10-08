import 'dotenv/config'
import updateEventData from './updateEventData.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateEventData('66cb08012286fde868dc015c', '66cb084995a5a42fa77c0b0d', 'http://https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver', 'Oxido', 'Concert of Panic Kids with Oxido', { type: 'Point', coordinates: [40.7128, -74.0060] }, new Date(), '20:00', 'https://crocantickets.com/'))
    .then(() => console.log('event updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())