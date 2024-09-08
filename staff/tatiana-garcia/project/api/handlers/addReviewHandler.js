import { logic } from '../../cor/index.js'
import { errors } from '../../com/index.js'

const { DuplicityError } = errors

export default (req, res, next) => {
    const { petsitterId } = req.params

    const { userId, comment, rate } = req.body

    try {
        logic.addReview(userId, petsitterId, comment, rate)
            .then(() => res.status(201).send())
            .catch(error => {
                if (error instanceof DuplicityError) {

                    return res.status(409).json({ error: 'DuplicityError', message: error.message })
                }

                next(error)
            })
    } catch (error) {
        next(error)
    }
}