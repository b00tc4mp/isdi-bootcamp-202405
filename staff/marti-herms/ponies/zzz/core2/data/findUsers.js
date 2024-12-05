import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function findUsers(condition, callback) {
    validate.callback(condition, 'condition')
    validate.callback(callback)

    fs.readFile(`${__dirname}/users.json`, 'utf8', (error, json) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        const users = json ? JSON.parse(json) : []

        const foundUsers = users.filter(condition)

        callback(null, foundUsers || null)
    })
}

export default findUsers