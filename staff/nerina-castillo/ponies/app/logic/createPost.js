import { validate, errors } from 'com'

export default (image, caption, callback) => {
  validate.url(image, 'image')
  validate.string(caption, 'caption')
  validate.callback(callback)

  const xhr = new XMLHttpRequest

  xhr.onload = () => {
    if (xhr.status === 201) {
      callback(null)

      return
    }

    const { error, message } = JSON.parse(xhr.response)

    const constructor = errors[error]

    callback(new constructor(message))
  }

  xhr.onerror = () => callback(new Error('network error'))

  xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts`)
  xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.send(JSON.stringify({ image, caption }))
}