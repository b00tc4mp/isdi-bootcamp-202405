import { logic } from '../../cor/index.js'

export default function updateEventHandler(req, res, next) {
    const { userId } = req

    const { eventId } = req.params

    const { title, organizer, date, duration, description, image, location, address, city } = req.body

    try {
        logic.updateEvent(userId, eventId, title, organizer, date, duration, description, image, location, address, city)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}