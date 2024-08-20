import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { userId } = req

    const { image, petsitterName, city, description, pets } = req.body

    try {
        logic.createPetsitter(userId, image, petsitterName, city, description, pets)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}