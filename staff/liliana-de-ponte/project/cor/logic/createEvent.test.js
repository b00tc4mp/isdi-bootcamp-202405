import 'dotenv/config'
import createEvent from './createEvent.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createEvent('66c0d2b3585140dd87567812', "TRT", "Sergio Canovas", 2024 / 9 / 11, "3 dias", "meditacion", "https://media2.giphy.com/media/2VYui7kj5C5I4/200.webp?cid=ecf05e47bfmp9wy35qj5daedm8klj8lstrxmmxrn5kup38gw&ep=v1_gifs_search&rid=200.webp&ct=g", { type: 'Point', coordinates: [41.47686595540431, 2.3062931879569866] }))
    .then(() => console.log('event created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())