import { logic } from 'cor'

export default (req, res, next) => {
    const { name, surname, email, phoneNumber, username, password, passwordRepeat, image, description } = req.body

    try {
        logic.registerInvestor(name, surname, email, phoneNumber, username, password, passwordRepeat, image, description)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}