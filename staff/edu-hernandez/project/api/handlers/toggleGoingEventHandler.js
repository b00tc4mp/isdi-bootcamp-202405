import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { eventId } = req.params

    try {
        logic.toggleGoingEvent(userId, eventId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}