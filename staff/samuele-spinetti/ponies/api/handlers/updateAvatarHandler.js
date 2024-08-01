import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { username } = req

    const { avatar } = req.body

    try {
        logic.updateAvatar(username, avatar)
            .then(() => res.status(204).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}