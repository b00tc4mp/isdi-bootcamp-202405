import fs from 'fs'

import validate from '../validate.js'

function deletePost(condition) {
    validate.callback(condition, 'consition')

    let json = fs.readFileSync("./data/posts.json", "utf-8") // lee dentro de la info si esta el archivo

    const posts = json ? JSON.parse(json) : [] // si esta lo parsea y lo mete en posts

    const postIndex = posts.findIndex(condition) //aqui los busca y los mete en postIndex

    if (postIndex > -1) {
        posts.splice(postIndex, 1)

        json = JSON.stringify(posts)

        fs.writeFileSync("./data/posts.json", json)
    }
}

export default deletePost