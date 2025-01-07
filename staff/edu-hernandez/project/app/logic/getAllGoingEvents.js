import { validate, errors } from 'com'

const { SystemError } = errors

export default () => {
    return fetch(`${import.meta.env.VITE_API_URL}/events/going`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response
            // console.debug('response status ->', status)

            if (status === 200)
                return response.json()
                    .then(events => {
                        // console.debug('result events ->', events)

                        return events
                    })

            return response.json()
                .then(body => {
                    const { error, message } = body
                    // console.debug('API error body->', body)

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}