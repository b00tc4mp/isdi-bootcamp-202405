import { User, Property } from '../data/models.js'  // Asumiendo que Property es tu modelo de propiedad
import { errors, validate } from '../../com/index.js'

const { NotFoundError, SystemError, ValidationError } = errors

export default (userId, image, description, location, price, type) => {
    validate.string(userId, 'userId')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.number(price, 'price')
    validate.type(type, 'type', ['floor', 'room']) // Valida que type sea 'piso' o 'habitacion'

    if (image) validate.string(image, 'image')
    if (!description) throw new ValidationError('description is required')
    if (!location) throw new ValidationError('location is required')
    if (!price) throw new ValidationError('price is required')
    if (!type) throw new ValidationError('type is required')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Property.create({
                owner: userId,  // Asume que 'owner' es el campo que referencia al usuario
                ...(image !== undefined && { image }),
                description,
                location,
                price,
                type
            })
                .catch(error => { throw new SystemError(error.message) })
        })
}