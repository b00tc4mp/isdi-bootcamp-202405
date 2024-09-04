import { User, Property } from '../data/models.js';
import { validate, errors } from 'com';

const { NotFoundError, SystemError } = errors;

export default (userId) => {
    // Validar que el userId sea una cadena de texto
    validate.string(userId, 'userId');

    // Buscar el usuario por ID
    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message); })
        .then(user => {
            if (!user) throw new NotFoundError('user not found');

            // Obtener todas las propiedades disponibles, ordenadas por fecha
            return Property.find({ aviable: true })
                .populate('owner', 'username avatar') // Obtiene los datos del propietario
                .populate('reviews') // Obtiene las reseñas
                .sort({ createdAt: -1 })
                .lean()
                .catch(error => { throw new SystemError(error.message); })
                .then(properties => {
                    properties.forEach(property => {
                        // Calcular el promedio de calificaciones
                        const totalRatings = property.reviews.reduce((sum, review) => sum + review.rating, 0);
                        property.rating = property.reviews.length ? totalRatings / property.reviews.length : 0;

                        // Convertir el ObjectId de la propiedad a string
                        property.id = property._id.toString();
                        delete property._id;
                    });

                    return properties;
                });
        });
};
