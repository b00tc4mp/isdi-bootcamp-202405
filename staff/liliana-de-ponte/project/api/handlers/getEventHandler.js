import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { eventId } = req.params

    try {
        logic.getEvent(userId, eventId)
            .then(event => res.json(event))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}