import validate from '../validate.js'

function findUser(condition) {
    validate.callback(condition, 'condition')

    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

    const user = users.find(condition)

    return user || null
}

export default findUser