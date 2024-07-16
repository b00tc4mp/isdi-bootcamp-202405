import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function findUsers(condition) {
    validate.callback(condition, 'condition')

    let json = fs.readFileSync(`${__dirname}/users.json`, 'utf8')

    const users = json ? JSON.parse(json) : []

    const foundUsers = users.filter(condition)

    return foundUsers || null
}

export default findUsers