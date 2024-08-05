import 'dotenv/config'

import createPost from "./createPost.js";

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createPost("66b0c81c631c3e104a4237bc", "httpshttps://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver", "hey"))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())




