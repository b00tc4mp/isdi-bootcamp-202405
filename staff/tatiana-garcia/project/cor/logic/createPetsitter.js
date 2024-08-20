import { User, Petsitter } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, image, petsitterName, city, description, pets) => {
    validate.string(userId, 'userId')
    validate.image(image, 'image')
    validate.string(petsitterName, 'petsitterName')
    validate.city(city, 'city')
    validate.description(description, 'description')
    validate.pets(pets, ['pets'])

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Petsitter.create({
                author: userId,
                image,
                petsitterName,
                city,
                description,
                pets
            })
        })
        .then(() => { })
}