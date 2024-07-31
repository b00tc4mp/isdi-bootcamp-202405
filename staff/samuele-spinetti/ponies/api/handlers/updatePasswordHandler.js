import { logic } from '../../cor'

export default (req, res, next) => {
    const { username } = req

    const { oldPassword, newPassword } = req.body

    try {
        logic.updatePassword(username, oldPassword, newPassword, error => {
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