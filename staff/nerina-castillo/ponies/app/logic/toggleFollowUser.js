import validate from "../../cor/validate.js"

function toggleFollowUser(username, callback) {
  validate.username(username)
  console.debug('toggleFollowUser called with username:', username)

  const xhr = new XMLHttpRequest

    xhr.onload = () => {
      console.debug('toggleFollowUser onload called with status:', xhr.status)
        if (xhr.status === 204) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = window[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('network error'))

    xhr.open('PATCH', `http://localhost:8080/users/${username}/follows`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)

    xhr.send()
 }

export default toggleFollowUser;
