import 'dotenv/config'
import createEvent from './createEvent.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createEvent('66be03f243d33462ad68cd4b', "TRT", "Sergio Canovas", 2024 / 9 / 11, "3 dias", "el evento trata de...", "https://media2.giphy.com/media/2VYui7kj5C5I4/200.webp?cid=ecf05e47bfmp9wy35qj5daedm8klj8lstrxmmxrn5kup38gw&ep=v1_gifs_search&rid=200.webp&ct=g", { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }))
    .then(() => console.log('event created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())