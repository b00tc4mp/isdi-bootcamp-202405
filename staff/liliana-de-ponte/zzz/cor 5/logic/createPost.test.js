import 'dotenv/config'
import createPost from './createPost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createPost('samuelespinetti', "https://media2.giphy.com/media/2VYui7kj5C5I4/200.webp?cid=ecf05e47bfmp9wy35qj5daedm8klj8lstrxmmxrn5kup38gw&ep=v1_gifs_search&rid=200.webp&ct=g", "Hello"))
    .then(() => console.log('post created'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
