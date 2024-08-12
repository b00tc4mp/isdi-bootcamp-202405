import { logic } from 'core'

export default (req, res, next) => {
    const { userId } = req

    const { name, image, description, link } = req.body

    try {
        logic.registerGame(userId, name, image, description, link)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}