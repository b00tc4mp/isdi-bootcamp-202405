import fs from 'fs'

import validate from '../validate.js';

function updatePost(condition, post) {
    validate.callback(condition, 'condition')
    validate.object(post, 'post')

    let json = fs.readFileSync("./data/posts.json", "utf-8");

    const posts = json ? JSON.parse(json) : [];

    const postIndex = posts.findIndex(condition)

    if (postIndex > -1) {
        posts.splice(postIndex, 1, post)

        json = JSON.stringify(posts)

        fs.writeFileSync("./data/posts.json", json)
    }
}

export default updatePost