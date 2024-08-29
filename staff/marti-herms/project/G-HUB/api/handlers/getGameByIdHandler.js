import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { gameId } = req.params

    try {
        logic.getGameById(userId, gameId)
            .then(game => res.json(game))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}