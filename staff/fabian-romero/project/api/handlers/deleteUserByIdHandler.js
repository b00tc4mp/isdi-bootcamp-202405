import { logic } from "cor"

export default (req, res, next) => {
    const { userId } = req

    try {
        logic.deleteUserById(userId)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}