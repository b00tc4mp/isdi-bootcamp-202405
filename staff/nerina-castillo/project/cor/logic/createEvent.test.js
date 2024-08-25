import 'dotenv/config'
import mongoose from 'mongoose'
import createEvent from './createEvent.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createEvent('66cb08012286fde868dc015c', 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver', 'Panic Kids', 'Concert of Panic Kids with Oxido', { type: 'Point', coordinates: [40.7128, -74.0060] }, new Date(), '21:30', 'https://crocantickets.com/'))
    .then(event => console.log(event))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

