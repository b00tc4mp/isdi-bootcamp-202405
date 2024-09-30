import 'dotenv/config'
import updateEvent from './updateEvent.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateEvent("66ec44abad73ca4bc2d7a28b", "66ec44d12e31e9398c8d37bc", "TRT", "Sergio Canovas", new Date('2024 / 9 / 17'), "3 dias", "meditacion", "https://media2.giphy.com/media/2VYui7kj5C5I4/200.webp?cid=ecf05e47bfmp9wy35qj5daedm8klj8lstrxmmxrn5kup38gw&ep=v1_gifs_search&rid=200.webp&ct=g", { type: 'Point', coordinates: [41.47686595540431, 2.3062931879569866] }, "Carrer diputacio 37", "Barcelona"))
    .then(() => console.log('event updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())