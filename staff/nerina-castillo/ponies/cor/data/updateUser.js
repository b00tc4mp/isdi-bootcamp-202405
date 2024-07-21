import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function updateUser(condition, user, callback) {
validate.callback(condition, 'condition')
validate.object(user, 'user')
validate.callback(callback)

fs.readFile(`${__dirname}/users.json`, 'utf8', (error, json) => {
  if(error) {
    callback(new Error(error.message))

    return
  }

  const users = json ? JSON.parse(json) : [];

  const index = users.findIndex(condition);

  if (index > -1) {
  users.splice(index, 1, user);

  json = JSON.stringify(users);


  fs.writeFile(`${__dirname}/users.json`, json, error => {
    if(error) {
      callback(new Error(error.message))

      return
    }

    callback(null)
  })

 }
})
  
  
}

export default updateUser;
