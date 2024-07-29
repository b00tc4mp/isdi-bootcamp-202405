import { validate, errors } from 'com'

export default callback => {
  validate.callback(callback)

  const xhr = new XMLHttpRequest

  xhr.onload = () => {
    if (xhr.status === 200) {
      const posts = JSON.parse(xhr.response)

      callback(null, posts)

      return
    }

    const { error, message } = JSON.parse(xhr.response)

    const constructor = errors[error]

    callback(new constructor(message))
  }

  xhr.onerror = () => callback(new Error('network error'))

  xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts`)
  xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
  xhr.send()
}