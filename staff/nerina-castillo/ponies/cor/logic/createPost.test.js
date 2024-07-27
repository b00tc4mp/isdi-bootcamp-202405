import 'dotenv/config'

import createPost from "./createPost.js";

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected')

        createPost("nerina", "httpshttps://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver", "hey", error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('post created')

            mongoose.disconnect()
        })
    })

    .catch(error => console.error(error))
