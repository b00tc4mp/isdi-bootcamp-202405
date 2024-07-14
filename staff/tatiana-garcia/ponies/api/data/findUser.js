import fs from 'fs'

import validate from '../validate.js'

function findUser(condition) {
    validate.callback(condition, 'consition')

    const json = fs.readFileSync("./data/users.json", 'utf-8')

    const users = json ? JSON.parse(json) : []

    const user = users.find(condition)

    return user || null

}

export default findUser
