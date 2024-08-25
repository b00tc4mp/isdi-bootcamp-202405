import { logic } from '../../cor/index.js'

export default function updateEventDataHandler(req, res, next) {
    const { userId } = req
    const { eventId } = req.params
    const { image, title, description, location, startDate, startTime, tickets } = req.body
    try {
        logic.updateEventData(userId, eventId, image, title, description, location, startDate, startTime, tickets)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}