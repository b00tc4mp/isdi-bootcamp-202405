import validate from '../validate.js'

function updateUser(condition, user) {
    validate.callback(condition, 'condition')
    validate.object(user, 'user')

    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

    const index = users.findIndex(condition)

    if (index > -1) {
        users.splice(index, 1, user)

        localStorage.users = JSON.stringify(users)
    }
}

export default updateUser