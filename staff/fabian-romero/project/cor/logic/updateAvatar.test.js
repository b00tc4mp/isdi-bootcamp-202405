import 'dotenv/config'
import updateAvatar from './updateAvatar.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => updateAvatar('66cdc67564c62e5a0ebbeff9', 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-lightning-icon-png-free-buckle-pattern-image_2283126.jpg'))
    .then(() => console.log('avatar updated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())