import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { gameId } = req.params

    try {
        logic.toggleAddGame(userId, gameId)
            .then(() => res.status(204).json())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}