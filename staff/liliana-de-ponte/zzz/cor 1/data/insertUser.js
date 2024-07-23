import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function insertUser(user) {
validate.object(user, 'user')

    let json = fs.readFileSync(`${__dirname}/users.json`, 'utf8')

    const users = json ? JSON.parse(json) : []

    users.push(user)
    json = JSON.stringify(users)

    fs.writeFileSync(`${__dirname}/users.json`, json)

}

export default insertUser
