import 'dotenv/config'
import createEvent from './createEvent.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    // .then(() => createEvent('66c2f4e2af6be35e2347458d', "TRT", "Sergio Canovas", 2024 / 9 / 11, "3 dias", "meditacion", "https://media2.giphy.com/media/2VYui7kj5C5I4/200.webp?cid=ecf05e47bfmp9wy35qj5daedm8klj8lstrxmmxrn5kup38gw&ep=v1_gifs_search&rid=200.webp&ct=g", { type: 'Point', coordinates: [41.47686595540431, 2.3062931879569866] }))
    // .then(() => createEvent('66cc8078cb2a169357521958', "FAI", "Sergio Canovas", new Date(2024 / 9 / 11), "4 dias", "Un evento de formacion...", "https://media2.giphy.com/media/2VYui7kj5C5I4/200.webp?cid=ecf05e47bfmp9wy35qj5daedm8klj8lstrxmmxrn5kup38gw&ep=v1_gifs_search&rid=200.webp&ct=g", { type: 'Point', coordinates: [41.38268957581993, 2.1589298486143953] }))

    .then(() => createEvent('66d074854b347e629e2ca9bf', "Crecimiento personal", "Samuele Spinetti", new Date('2024 / 9 / 17'), "4 dias", "aprenderemos sobre:", "https://media2.giphy.com/media/2VYui7kj5C5I4/200.webp?cid=ecf05e47bfmp9wy35qj5daedm8klj8lstrxmmxrn5kup38gw&ep=v1_gifs_search&rid=200.webp&ct=g", { type: 'Point', coordinates: [41.38249928035046, 2.152969735831627] }, "Carrer diputacio 37", "Barcelona"))
    .then(() => console.log('event created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())