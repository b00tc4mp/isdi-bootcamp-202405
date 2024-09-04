import { validate, errors } from '../../com/index.js';

const { SystemError, NotFoundError } = errors;

export default function getDocument(propertyId, type) {
    // Validar entradas
    validate.string(propertyId, 'propertyId');
    validate.string(type, 'type');

    // Realizar la solicitud a la API para obtener el documento
    return fetch(`${import.meta.env.VITE_API_URL}/properties/${propertyId}/documents/${type}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
        }
    })
    .then(response => {
        if (response.ok) {
            return response.blob();  // Recuperar el archivo como un blob
        }
        return response.json().then(body => {
            const { error, message } = body;
            const constructor = errors[error] || Error;  // Mapea el error si existe, o usa el genérico
            throw new constructor(message);
        });
    })
    .then(blob => {
        // Aquí puedes procesar el blob, por ejemplo, crear un enlace de descarga
        const url = window.URL.createObjectURL(blob);
        return { url, blob };  // Devolver la URL y el blob para más manipulaciones
    })
    .catch(error => {
        throw new SystemError(error.message);
    });
}
