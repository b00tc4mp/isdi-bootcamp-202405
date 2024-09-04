import { Document, Property } from '../data/models.js';
import { validate, errors } from 'com';

const { NotFoundError, ValidationError, SystemError } = errors;

export default (propertyId, contentBuffer, type, url) => {
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

      return Document.create({
        property: propertyId,
        content: contentBuffer,  // Guarda el archivo como un buffer
        type,
        url,
        date: new Date()
      })
      .catch(error => { throw new SystemError(error.message); });
    });
};
