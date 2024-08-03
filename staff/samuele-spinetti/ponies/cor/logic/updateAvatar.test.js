import 'dotenv/config'
import updateAvatar from './updateAvatar.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateAvatar('66acc905a4613054b12160b5', 'https://media.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.gif?cid=790b76112723qawue4wb4csm6w86jno3khupqhzqag5992sb&ep=v1_gifs_trending&rid=giphy.gif&ct=g'))
    .then(() => console.log('Avatar updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())