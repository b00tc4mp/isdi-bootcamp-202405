import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function insertMessage(condition, message, callback) {
    validate.callback(condition, 'condition')
    validate.string(message, 'message')
    validate.callback(callback)

    fs.readFile(`${__dirname}/chats.json`, 'utf-8', (error, json) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        const chats = json ? JSON.parse(json) : []

        const index = chats.findIndex(condition)

        chats[index].chat.push(message)

        json = JSON.stringify(chats)

        fs.writeFile(`${__dirname}/chats.json`, json, (error) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            callback(null)
        })
    })
}

export default insertMessage