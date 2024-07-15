import fs from 'fs'

import validate from '../validate.js'

function findUser(condition) {
    validate.callback(condition, 'condition')

    let json = fs.readFileSync('./data/users.json', 'utf8')

    const users = json ? JSON.parse(json) : []

    const user = users.find(condition)

    return user || null
}

export default findUser