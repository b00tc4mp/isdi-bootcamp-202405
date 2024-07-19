const editUserInfo = (avatar, newUsername, password, callback) => {
    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 204) {
            sessionStorage.username = newUsername

            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = window[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('network error'))

    xhr.open('PATCH', `http://localhost:8080/users/${sessionStorage.username}`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.send(JSON.stringify({ avatar, newUsername, password }))
}

export default editUserInfo