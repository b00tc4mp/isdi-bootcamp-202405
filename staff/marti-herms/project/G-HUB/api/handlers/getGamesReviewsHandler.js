import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { gameId } = req.params

    try {
        logic.getGameReviews(userId, gameId)
            .then(reviews => res.json(reviews))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}