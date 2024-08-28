import { validate, errors } from 'com'

const { SystemError } = errors

export default (name, surname, email, phoneNumber, username, password, passwordRepeat, role, title, image, description, category, startDate, endDate, budgetGoal, bank) => {
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
    validate.string(startDate)
    validate.string(endDate)
    validate.string(budgetGoal)
    validate.string(bank)

    return fetch(`${import.meta.env.VITE_API_URL}/users/project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, email, phoneNumber, username, password, passwordRepeat, role, title, image, description, category, startDate, endDate, budgetGoal, bank })
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