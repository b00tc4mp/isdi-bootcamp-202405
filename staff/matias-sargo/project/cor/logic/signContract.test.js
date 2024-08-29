import 'dotenv/config';
import mongoose from 'mongoose';
import signContract from './signContract.js';  


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info('Connected to MongoDB');

        // Intentar firmar el contrato con el propietario
        return signContract('66cd84c564d763f19ce6d197', '66cd84c564d763f19ce6d1a1'); 
    })
    .then(updatedContract => {
        console.log('Contract signed by owner:', updatedContract);

        // Intentar firmar el contrato con el inquilino
        return signContract('66cd84c564d763f19ce6d19c', updatedContract._id.toString()); // tenantId y contractId
    })
    .then(updatedContract => {
        console.log('Contract signed by tenant:', updatedContract);
    })
    .catch(error => {
        console.error('Error during the test:', error);
    })
    .finally(() => {
        mongoose.disconnect()
            .then(() => console.info('Disconnected from MongoDB'))
            .catch(error => console.error('Error disconnecting from MongoDB:', error));
    });
