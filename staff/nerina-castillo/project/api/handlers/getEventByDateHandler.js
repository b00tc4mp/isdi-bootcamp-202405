import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { date } = req.params

    try {
        logic.getEventByDate(userId, date)
            .then(events => res.json(events))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}