import { validate, errors } from '../../com/index.js';
import fs from 'fs';

const { SystemError } = errors;

export default (propertyId, filePath, type, url) => {
    validate.string(propertyId, 'propertyId');
    validate.string(type, 'type');
    validate.string(url, 'url');

    const validTypes = ['contract', 'invoice', 'tax'];
    if (!validTypes.includes(type)) {
        throw new ValidationError('Invalid document type');
    }

    const fileContent = fs.readFileSync(filePath);

    // Realiza la solicitud a la API para crear el documento
    return fetch(`${import.meta.env.VITE_API_URL}/documents`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            propertyId,
            content: fileContent.toString('base64'),  // Convertir a base64 antes de enviar
            type,
            url,
        }),
    })
    .catch(error => {
        throw new SystemError(error.message);
    })
    .then(response => {
        const { status } = response;

        if (status === 201) return;

        return response.json().then(body => {
            const { error, message } = body;
            const constructor = errors[error];
            throw new constructor(message);
        });
    });
};
