import { errors } from '../../com/index.js';

const { SystemError } = errors;

export default () => {
    return fetch(`${import.meta.env.VITE_API_URL}/properties`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json', // Especifica el tipo de contenido
        },
    })
        .catch(error => {
            throw new SystemError(error.message); // Manejo de errores del sistema
        })
        .then(response => {
            const { status } = response;

            if (status === 200) {
                return response.json()
                    .then(properties => properties); // Devuelve las propiedades si la solicitud es exitosa
            }

            return response.json().then(body => {
                const { error, message } = body;

                const constructor = errors[error]; // Obtiene el constructor del error correspondiente

                throw new constructor(message); // Lanza un error personalizado basado en la respuesta del servidor
            });
        });
};
