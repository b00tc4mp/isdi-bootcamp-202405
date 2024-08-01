import { logic } from "core"

export default (req, res, next) => {
    const { username } = req

    const { targetUsername } = req.params

    try {
        logic.getUser(username, targetUsername)
            .then(user => res.json(user))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}