import { Document } from '../data/models.js';
import { validate, errors } from 'com';

const { NotFoundError, SystemError } = errors;

export default function getDocument(propertyId, type) {
    // Validar entradas
    validate.string(propertyId, 'propertyId');
    validate.string(type, 'type');

    // Buscar el documento en la base de datos
    return Document.findOne({ property: propertyId, type })
        .then(document => {
            if (!document) {
                throw new NotFoundError(`No document found for propertyId: ${propertyId} and type: ${type}`);
            }

            // Retornar el documento encontrado
            return document;
        })
        .catch(error => {
            throw new SystemError(error.message);
        });
}
