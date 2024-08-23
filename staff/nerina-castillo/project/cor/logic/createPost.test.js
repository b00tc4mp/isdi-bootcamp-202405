import 'dotenv/config'
import mongoose from 'mongoose'
import createPost from './createPost.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createPost('66c5b521116ac42a8bb4ac93', 'httpshttps://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver', 'lalalaaaa'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())