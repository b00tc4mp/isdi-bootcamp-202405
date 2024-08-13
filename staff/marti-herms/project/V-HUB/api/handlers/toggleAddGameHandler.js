import { logic } from 'core'

export default (req, res, next) => {
    const { userId, gameId } = req

    try {
        logic.toggleAddGame(userId, gameId)
            .then(games => res.json(games))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}