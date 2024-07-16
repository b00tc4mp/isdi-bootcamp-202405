import fs from 'fs'

function insertPost(post) {
    let json = fs.writeFileSync(`${__dirname}/posts.json`, 'utf8')

    const posts = json ? JSON.parse(json) : []

    posts.push(post)

    json = JSON.stringify(posts)

    fs.writeFileSync('./data/posts.json', json)
}

export default insertPost