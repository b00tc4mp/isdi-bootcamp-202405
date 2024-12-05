import { logic } from "core"

export default (req, res, next) => {
    const { username } = req

    const { targetUsername } = req.params

    try {
        logic.getUser(username, targetUsername, (error, user) => {
            if (error) {
                next(error)

                return
            }

            res.json(user)
        })
    } catch (error) {
        next(error)
    }
}