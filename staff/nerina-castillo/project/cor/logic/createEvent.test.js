import 'dotenv/config'
import mongoose from 'mongoose'
import createEvent from './createEvent.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createEvent('66bce29709e08ebd9fad9884', 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver', 'Barrenfields concert', { type: 'Point', coordinates: [40.7128, -74.0060] }, new Date(), new Date()))
    .then(event => console.log(event))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

