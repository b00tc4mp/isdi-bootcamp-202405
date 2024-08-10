const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    //TODO input validation

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = window[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('network error'))

    xhr.open('POST', 'http://localhost:8080/users')
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(JSON.stringify({ name, surname, email, username, password, passwordRepeat }))
}

export default registerUser