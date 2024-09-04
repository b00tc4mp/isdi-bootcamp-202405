import { validate, errors } from '../../com/index.js';
import { Contract } from '../data/models.js';

const { SystemError } = errors;

export default function createContract(propertyId, ownerId, tenantId, startDate, endDate, price) {
    // Validaciones
    validate.string(propertyId, 'propertyId');
    validate.string(ownerId, 'ownerId');
    validate.string(tenantId, 'tenantId');
    validate.date(startDate, 'startDate');
    validate.date(endDate, 'endDate');
    validate.number(price, 'price');

    // Crear el contrato
    return Contract.create({
        property: propertyId,
        owner: ownerId,
        tenant: tenantId,
        startDate,
        endDate,
        price,
        signedBy: []
    })
        .catch(error => {
            throw new SystemError(error.message);
        });
}
