import { logic } from "core"

export default (req, res, next) => {
    const { username } = req

    try {
        logic.getUserList(username)
            .then(userList => res.json(userList))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}