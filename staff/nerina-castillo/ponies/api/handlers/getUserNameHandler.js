import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { username } = req

    const { targetUsername } = req.params

    try {
        logic.getUserName(username, targetUsername, (error, name) => {
            if (error) {
                next(error)

                return
            }

            res.json(name)
        })
    } catch (error) {
        next(error)
    }
}