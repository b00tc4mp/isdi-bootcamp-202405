import { logic } from "core"

export default (req, res, next) => {
    const { username } = req

    const { targetUsername } = req.params

    try {
        logic.getUserName(username, targetUsername)
            .then(name => res.json(name))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}