import validate from "../../cor/validate.js"

const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
  validate.name(name)
  validate.name(surname)
  validate.email(email)
  validate.username(username)
  validate.password(password)
  validate.password(passwordRepeat)
  validate.callback(callback)

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

  xhr.send(JSON.stringify({ name, surname, email, username, password, passwordRepeat }))
}

export default registerUser;
