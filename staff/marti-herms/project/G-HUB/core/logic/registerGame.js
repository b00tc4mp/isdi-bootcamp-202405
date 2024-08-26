import { User, Game } from '../data/models.js'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, name, image, description, link) => {
    validate.string(userId, 'userId')
    validate.string(name, 'name')
    validate.string(image, 'image')
    validate.string(description, 'description')
    validate.string(link, 'link')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(author => {
            if (!author) throw new NotFoundError('user not found')

            return Game.create({
                author,
                name,
                image,
                description,
                link
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(game =>
            User.findByIdAndUpdate(userId, { $push: { games: game.id } })
                .catch(error => { throw new SystemError(error.message) })
        )
        .then(() => { })
}