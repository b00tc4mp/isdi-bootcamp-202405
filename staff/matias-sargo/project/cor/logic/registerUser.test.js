import 'dotenv/config';
import registerUser from './registerUser.js';
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
console.log('MONGODB_URI:', uri); // Verifica que la URI se está cargando correctamente

if (!uri) {
    console.error('MONGODB_URI is not defined in the environment variables');
    process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Aquí estamos registrando un usuario con el rol de 'tenant'
        return registerUser('Samu', 'Spine', 'samu@spine.com', 'samu', 'y12345647a', '123123123', '123123123', 'tenant');
    })
    .then(() => {
        console.log('Tenant user registered successfully');
        return registerUser('Lina', 'Smith', 'lina@smith.com', 'lina', 'x12345678b', '123123123', '123123123', 'landlord');
    })
    .then(() => console.log('Landlord user registered successfully'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect());
