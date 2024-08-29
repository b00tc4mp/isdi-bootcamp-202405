import { Document, Property } from '../data/models.js';
import { validate, errors } from 'com';
import fs from 'fs';

const { NotFoundError, ValidationError, SystemError } = errors;

export default (propertyId, filePath, type, url) => {

    validate.string(propertyId, 'propertyId');
    validate.string(type, 'type');
    validate.string(url, 'url');

    const validTypes = ['contract', 'invoice', 'tax'];
    if (!validTypes.includes(type)) {
        throw new ValidationError('Invalid document type');
    }

    return Property.findById(propertyId)
        .catch(error => { throw new SystemError(error.message); })
        .then(property => {
            if (!property) {
                throw new NotFoundError('Property not found');
            }

            let content;
            try {
                content = fs.readFileSync(filePath);
            } catch (error) {
                throw new SystemError(`Error reading file: ${error.message}`);
            }

            return Document.create({
                property: propertyId,
                content,
                type,
                url,
                date: new Date()
            })
            .catch(error => { throw new SystemError(error.message); });
        });
};
