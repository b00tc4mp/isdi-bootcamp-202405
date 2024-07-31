import { logic } from "core"

export default (req, res, next) => {
    const { username } = req

    try {
        logic.getUserList(username, (error, userList) => {
            if (error) {
                next(error)

                return
            }

            res.json(userList)
        })
    } catch (error) {
        next(error)
    }
}