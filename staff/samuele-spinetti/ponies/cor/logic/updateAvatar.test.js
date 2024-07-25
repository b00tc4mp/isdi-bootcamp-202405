import 'dotenv/config'
import updateAvatar from './updateAvatar.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected')

        updateAvatar('samu', 'https://media.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.gif?cid=790b76112723qawue4wb4csm6w86jno3khupqhzqag5992sb&ep=v1_gifs_trending&rid=giphy.gif&ct=g', error => {
            if (error) {
                console.error(error)

                return
            }

            console.log('Avatar updated')

            mongoose.disconnect()
        })
    })
    .catch(error => console.error(error))
