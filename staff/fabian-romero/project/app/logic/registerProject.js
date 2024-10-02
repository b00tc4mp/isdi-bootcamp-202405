import { validate, errors } from 'com'

const { SystemError } = errors

export default (name, surname, email, phoneNumber, username, password, passwordRepeat, role, title, image, description, category, startDate, endDate, budgetGoal) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.phoneNumber(phoneNumber)
    validate.username(username)
    validate.password(password)
    validate.string(role)
    validate.string(title)
    validate.url(image, 'image')
    validate.string(description)
    validate.string(category)
    validate.date(startDate, 'startDate')
    validate.date(endDate, 'endDate')
    validate.string(budgetGoal)

    return fetch(`${import.meta.env.VITE_API_URL}/users/project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, email, phoneNumber, username, password, passwordRepeat, role, title, image, description, category, startDate, endDate, budgetGoal })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 201) return

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}