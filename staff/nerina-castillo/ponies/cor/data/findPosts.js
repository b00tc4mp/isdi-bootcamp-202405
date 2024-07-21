import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


function findPosts(condition, callback) {
  validate.callback(condition, 'condition')
  validate.callback(callback)

  fs.readFile(`${__dirname}/posts.json`, 'utf8', (error, json) => {
      if (error) {
          callback(new Error(error.message))

          return
      }

      const posts = json ? JSON.parse(json) : []

      const foundPosts = posts.filter(condition)

      callback(null, foundPosts)
  })
}


export default findPosts;
