import { validate, errors } from 'com'

const { SystemError } = errors

export default (image, caption) => {
    validate.url(image, 'image')
    validate.string(title, 'title')
    validate.string(caption, 'caption')
    validate.string(categoria, 'categoria')
    validate.string(starDate, 'stardate')
    validate.strgin(budgetMin, 'budgetMin')

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, caption })
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
//camabiar la categoria a desplegrble