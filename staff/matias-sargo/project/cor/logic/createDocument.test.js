import 'dotenv/config'
import createDocument from './createDocument.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => createDocument('66cd84c564d763f19ce6d19f', 'contract.pdf', 'contract', 'https://drive.google.com/file/d/1WKxd6Nlursd9ZIEPh-hykScsbpAcRKSN/view?usp=sharing'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())