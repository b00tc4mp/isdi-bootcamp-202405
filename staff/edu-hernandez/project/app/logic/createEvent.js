import { validate, errors } from 'com'

const { SystemError } = errors

export default (title, image, caption, date, location, time) => {
    validate.string(title, 'title')
    validate.url(image, 'image')
    validate.string(caption, 'caption')
    validate.date(date, 'date')
    validate.location(location, 'location')
    validate.time(time, 'time')

    return fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, image, caption, date, location, time })
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
        .catch(error => {
            throw new SystemError(error.message)
        })
}