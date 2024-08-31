import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { title, organizer, date, duration, description, image, location, address, city } = req.body

    try {
        logic.createEvent(userId, title, organizer, date, duration, description, image, location, address, city)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
