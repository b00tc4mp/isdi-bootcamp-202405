import 'dotenv/config';
import mongoose from 'mongoose';
import createContract from './createContract.js';
import registerUser from './registerUser.js';
import createProp from './createProp.js';

console.log('MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info('Connected to MongoDB');

        // Crear un usuario propietario (landlord)
        return registerUser('Lina', 'Smith', 'lina@smith.com', 'lina', 'x12345678b', '123123123', '123123123', 'landlord');
    })
    .then(landlord => {
        console.log('Landlord created:', landlord);

        // Crear un usuario inquilino (tenant)
        return registerUser('Samu', 'Spine', 'samu@spine.com', 'samu', 'y12345647a', '123123123', '123123123', 'tenant')
            .then(tenant => ({ landlord, tenant }));
    })
    .then(({ landlord, tenant }) => {
        console.log('Tenant created:', tenant);

        // Crear una propiedad del propietario
        return createProp(
            landlord._id.toString(), // userId
            ['https://example.com/image1.jpg'], // images
            'Beautiful apartment', // title
            'This is a beautiful apartment in the city center', // description
            '123 Main St, New York, NY', // address
            40.7128, // latitude
            -74.0060, // longitude
            2500, // price
            'apartment' // type
        ).then(property => ({ landlord, tenant, property }));
    })
    .then(({ landlord, tenant, property }) => {
        console.log('Property created:', property);

        // Crear el contrato entre el propietario y el inquilino
        return createContract(
            property._id.toString(), // propertyId
            landlord._id.toString(), // ownerId
            tenant._id.toString(), // tenantId
            new Date('2024-09-01'), // startDate
            new Date('2025-09-01'), // endDate
            2500 // price
        );
    })
    .then(contract => {
        console.log('Contract created:', contract);
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        mongoose.disconnect()
            .then(() => console.info('Disconnected from MongoDB'))
            .catch(error => console.error('Error disconnecting from MongoDB:', error));
    });
