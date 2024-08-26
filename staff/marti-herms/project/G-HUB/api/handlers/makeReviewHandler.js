import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { gameId } = req.params

    const { comment, rate } = req.body

    try {
        logic.makeReview(userId, gameId, comment, rate)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}