import { User, Event } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, title, image, caption, date, location, time) => {
    validate.string(userId, 'userId')
    validate.string(title, 'title')
    validate.url(image, 'image')
    validate.string(caption, 'caption')
    validate.location(location, 'location')
    validate.date(date, 'date')
    validate.time(time, 'time')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.create({
                author: userId,
                title,
                image,
                caption,
                date,
                location,
                time
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(event => event)
}