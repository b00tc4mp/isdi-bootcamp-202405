import { logic } from 'cor'

export default (req, res, next) => {
    const { name, surname, email, phoneNumber, username, password, passwordRepeat, role, title, image, description, category, startDate, endDate, budgetGoal } = req.body

    try {
        logic.registerProject(name, surname, email, phoneNumber, username, password, passwordRepeat, role, title, image, description, category, startDate, endDate, budgetGoal)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}