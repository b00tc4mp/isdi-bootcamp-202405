import { logic } from "core"

export default (req, res, next) => {
    const { username } = req

    const { targetUsername } = req.params

    try {
        logic.toggleUserFollow(username, targetUsername, (error) => {
            if (error) {
                next(error)

                return
            }

            res.status(204).send()
        })
    } catch (error) {
        next(error)
    }
}