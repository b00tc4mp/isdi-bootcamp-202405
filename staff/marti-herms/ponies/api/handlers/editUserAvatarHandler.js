import { logic } from "core"

export default (req, res, next) => {
    const { username } = req

    const { avatar } = req.body

    try {
        logic.editUserAvatar(username, avatar, (error) => {
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