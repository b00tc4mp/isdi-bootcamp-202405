import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default function (userId, newImage, newName, newCity, newDescription, newLinkPage, newContactEmail, newPhoneNumber, newPets) {
    validate.id(userId, 'userId')
    validate.image(newImage, 'newImage')
    validate.name(newName, 'newName')
    validate.city(newCity, 'newCity')
    validate.description(newDescription, 'newDescription')
    validate.image(newLinkPage, 'newLinkPage')
    validate.email(newContactEmail, 'newContactEmail')
    validate.phoneNumber(newPhoneNumber, 'newPhoneNumber')
    validate.pets(newPets, 'newPets')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(petsitter => {
            if (!petsitter) throw new NotFoundError('petsitter not found')

            return User.findByIdAndUpdate(userId, { image: newImage, name: newName, city: newCity, description: newDescription, linKPage: newLinkPage, contacEmail: newContactEmail, phoneNumber: newPhoneNumber, pets: newPets })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}