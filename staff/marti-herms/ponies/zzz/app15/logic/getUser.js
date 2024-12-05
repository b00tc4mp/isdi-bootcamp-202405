const getUser = (username, callback) => {
    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            const user = JSON.parse(xhr.response)

            callback(null, user)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = window[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('network error'))

    xhr.open('GET', `http://localhost:8080/users/${username}`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.send()
}

export default getUser