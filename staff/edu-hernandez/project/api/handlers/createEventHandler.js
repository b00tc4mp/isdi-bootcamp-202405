import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { title, image, caption, date, location, time } = req.body

    try {
        logic.createEvent(userId, title, image, caption, date, location, time)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}