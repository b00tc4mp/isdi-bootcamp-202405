import { logic } from 'cor'

export default (req, res, next) => {
    const { username } = req

    const { targetUsername } = req.params

    try {
        logic.toggleFollowUser(username, targetUsername, error => {
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