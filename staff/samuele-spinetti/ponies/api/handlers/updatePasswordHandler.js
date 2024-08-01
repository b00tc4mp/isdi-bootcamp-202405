import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { username } = req

    const { oldPassword, newPassword } = req.body

    try {
        logic.updatePassword(username, oldPassword, newPassword)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}