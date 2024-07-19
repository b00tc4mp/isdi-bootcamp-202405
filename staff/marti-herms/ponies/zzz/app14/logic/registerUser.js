const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    //TODO input validation

    if (password !== passwordRepeat) throw new Error('password is different from repeat password')

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 201) {
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

    const data = { name, surname, email, username, password }

    xhr.send(JSON.stringify(data))
}

export default registerUser