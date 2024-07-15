import fs from 'fs'

import validate from '../validate.js'

function updateUser(condition, user) {
    validate.callback(condition, 'condition')
    validate.object(user, 'user')

    let json = fs.readFileSync('./data/users.json', 'utf8')

    const users = json ? JSON.parse(json) : []

    const postIndex = users.findIndex(condition)

    if (postIndex > -1) {
        users.splice(postIndex, 1, user)

        json = JSON.stringify(users)

        fs.writeFileSync('./data/users.json', json)
    }
}

export default updateUser