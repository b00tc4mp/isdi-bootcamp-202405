import { validate, errors } from '../../com/index.js';

const { SystemError, ValidationError } = errors;

export default function createDocument(propertyId, file, type, url) {
    // Validar entradas
    validate.string(propertyId, 'propertyId');
    validate.instance(file, File, 'file'); // Asegúrate de que `file` sea una instancia de `File`
    validate.string(type, 'type');
    validate.string(url, 'url');

    const validTypes = ['contract', 'invoice', 'tax'];
    if (!validTypes.includes(type)) {
        throw new ValidationError('Invalid document type');
    }

    // Crear un FormData para enviar como multipart/form-data
    const formData = new FormData();
    formData.append('propertyId', propertyId);
    formData.append('type', type);
    formData.append('url', url);
    formData.append('content', file);

    // Realizar la solicitud a la API para crear el documento
    return fetch(`${import.meta.env.VITE_API_URL}/documents`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,  // Obtener el token de sesión del usuario
        },
        body: formData,  // FormData se maneja automáticamente como multipart/form-data
    })
    .then(response => {
        if (response.ok) {
            return response.json();  // Si la solicitud fue exitosa, devolver la respuesta en JSON
        }
        return response.json().then(body => {
            const { error, message } = body;
            const constructor = errors[error] || Error;  // Mapea el error si existe, o usa el genérico
            throw new constructor(message);
        });
    })
    .catch(error => {
        throw new SystemError(error.message);  // Manejo de errores
    });
}
