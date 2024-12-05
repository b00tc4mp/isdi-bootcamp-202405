import { logic } from "core"

export default (req, res, next) => {
    const { userId } = req

    const { targetUserId } = req.params

    try {
        logic.toggleUserFollow(userId, targetUserId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}