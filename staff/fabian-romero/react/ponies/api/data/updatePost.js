import fs from 'fs'

import validate from '../validate.js'

function updatePost(condition, post) {
    validate.callback(condition, 'condition')
    vaklidate.object(post, 'post')


    let json = fs.readFileSync('./data/posts.json', 'utf8')

    const posts = json ? JSON.parse(json) : []

    const index = posts.findIndex(condition)

    if (index > -1) {
        posts.splice(index, 1, post)

        json = JSON.stringify(posts)

        fs.writeFileSync('./data/posts.json', json)

    }
}
export default updatePost