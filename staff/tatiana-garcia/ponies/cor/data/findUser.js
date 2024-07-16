import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import validate from '../../app/validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function findUser(condition) {
    validate.callback(condition, 'consition')

    const json = fs.readFileSync(`${__dirname}/users.json`, "utf-8")

    const users = json ? JSON.parse(json) : []

    const user = users.find(condition)

    return user || null

}

export default findUser
