import { validate, errors } from '../../com/index.js';

const { SystemError } = errors;

export default (images, title, description, address, latitude, longitude, price, type) => {
    // Validaciones
    validate.array(images, validate.url, 'images'); // Asegura que 'images' sea un array de URLs válidos
    validate.string(title, 'title'); // Asegura que 'title' sea un string válido
    validate.string(description, 'description');
    validate.string(address, 'address'); // Asegura que 'address' sea un string válido
    validate.latitude(latitude, 'latitude');
    validate.longitude(longitude, 'longitude');
    validate.number(price, 'price');
    validate.type(type, 'type'); // Valida que 'type' sea 'apartment' o 'room'

    // Realiza la solicitud a la API para crear la propiedad
    return fetch(`${import.meta.env.VITE_API_URL}/properties`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            images,
            title,
            description,
            address,
            location: { type: 'Point', coordinates: [longitude, latitude] }, // Formato GeoJSON para la ubicación
            price,
            type,
        }),
    })
        .catch(error => {
            throw new SystemError(error.message); // Manejo de errores del sistema
        })
        .then(response => {
            const { status } = response;

            if (status === 201) return; // Si la creación es exitosa, no hacemos nada más

            return response.json().then(body => {
                const { error, message } = body;

                const constructor = errors[error]; // Obtiene el constructor del error correspondiente

                throw new constructor(message); // Lanza un error personalizado basado en la respuesta del servidor
            });
        });
};
