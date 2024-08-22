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

            // Obtener todas las propiedades ordenadas por fecha
            return Property.find({}, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message); })
                .then(properties => {
                    // Para cada propiedad, obtener los datos del propietario
                    const promises = properties.map(property => {
                        return User.findById(property.owner).lean()
                            .catch(error => { throw new SystemError(error.message); })
                            .then(owner => {
                                if (!owner) throw new NotFoundError('owner not found');

                                // Enriquecer la propiedad con información del propietario
                                property.owner = {
                                    id: owner._id.toString(),
                                    username: owner.username,
                                    avatar: owner.avatar,
                                    following: (user.following || []).some(userObjectId => userObjectId.toString() === owner._id.toString())
                                };

                                // Convertir el ObjectId de la propiedad a string
                                property.id = property._id.toString();
                                delete property._id;

                                return property;
                            });
                    });

                    // Resolver todas las promesas y devolver las propiedades
                    return Promise.all(promises)
                        .then(properties => properties);
                });
        });
};