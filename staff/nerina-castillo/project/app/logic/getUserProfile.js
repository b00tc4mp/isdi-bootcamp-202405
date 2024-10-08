import { errors } from '../../com/index.js'

const { SystemError } = errors

export default () => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200) {
                return response.json()
                    .then(data => {

                        return {
                            id: data.id,
                            username: data.username,
                            avatar: data.avatar,
                            description: data.description,
                            posts: data.posts
                        }
                    })
            }

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}
