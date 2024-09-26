import { logic } from 'cor'

export default (req, res, next) => {
    const { userId } = req

    const { oldPassword, newPassword, newPasswordRepeat } = req.body

    try {
        logic.updatePassword(userId, oldPassword, newPassword, newPasswordRepeat)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}