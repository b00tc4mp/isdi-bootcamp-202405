import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function updateUser(condition, user) {
    validate.callback(condition, 'condition')
    validate.object(user, 'user')

    let json = fs.readFileSync(`${__dirname}/users.json`, 'utf8')

    const users = json ? JSON.parse(json) : []

    const index = users.findIndex(condition)

    if (index > -1) {
        users.splice(index, 1, user)

        json = JSON.stringify(users)

        fs.writeFileSync(`${__dirname}/users.json`, json)
    }
}

export default updateUser