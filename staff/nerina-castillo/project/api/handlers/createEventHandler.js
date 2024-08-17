import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { image, title, description, location, startDate, startTime, tickets } = req.body

    try {
        logic.createEvent(userId, image, title, description, location, startDate, startTime, tickets)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}