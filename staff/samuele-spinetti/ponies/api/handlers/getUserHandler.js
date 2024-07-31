import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { username } = req

    const { targetUsername } = req.params

    try {
        logic.getUser(username, targetUsername, (error, user) => {
            if (error) {
                next(error)

                return
            }

            res.send(user)
        })
    } catch (error) {
        next(error)
    }
}