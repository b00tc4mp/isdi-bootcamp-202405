import 'dotenv/config'
import deletePost from './deletePost.js'

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => deletePost('66acb2db1f5dbdd3ba4e3efc', '66acb38426abbf50dc96af2f'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
