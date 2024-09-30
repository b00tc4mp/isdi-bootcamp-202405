import 'dotenv/config'
import registerProject from './registerProject.js'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => registerProject('maria', 'calambres', 'electu@nsanchez.com', '987654321', 'mariacalambres', '123123123', '123123123', 'project', 'Compa de Luz', 'http://registrodeproject', 'description', 'category', '09/14/2024', '09/14/2025', '5000'))
    .then(() => console.log('User registered'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())